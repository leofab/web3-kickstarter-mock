//SPDX-License-Identifier: MIT
pragma solidity >=0.5.0 <0.9.0;

contract CampanhaFactory {
    Campanha[] public deployedCampaigns;

    function createCampanha(uint256 minimum) public {
        Campanha newCampaign = new Campanha(minimum, msg.sender);
        deployedCampaigns.push(newCampaign);
    }

    function getDeployedCampaigns() public view returns (Campanha[] memory) {
        return deployedCampaigns;
    }
}

contract Campanha {
    struct Request {
        string description;
        uint256 value;
        address recipient;
        bool complete;
        uint256 approvalCount;
        mapping(address => bool) approvals;
    }

    address public manager;
    uint256 public minimumContribution;
    mapping(address => bool) public contributers;
    uint256 public approversCount;
    uint256 numRequests;
    mapping(uint256 => Request) public requestList;

    constructor(uint256 minimum, address creator) {
        manager = creator;
        minimumContribution = minimum;
    }

    modifier restricted() {
        require(
            msg.sender == manager,
            "Only the campaign manager can call this function."
        );
        _;
    }

    function contribute() public payable {
        require(
            msg.value >= minimumContribution,
            "A minimum contribution is required"
        );
        contributers[msg.sender] = true;
        approversCount++;
    }

    function createRequest(
        string memory desc,
        uint256 val,
        address rec
    ) public restricted {
        Request storage newRequest = requestList[numRequests++];
        newRequest.description = desc;
        newRequest.value = val;
        newRequest.recipient = rec;
        newRequest.complete = false;
        newRequest.approvalCount = 0;
    }

    function approveRequest(uint256 index) public {
        Request storage requester = requestList[index];

        require(
            contributers[msg.sender],
            "Only contributors can approve a specific payment request"
        );
        require(
            !requester.approvals[msg.sender],
            "You have already voted to approve this request"
        );

        requester.approvals[msg.sender] = true;
        requester.approvalCount++;
    }

    function finalizeRequest(uint256 index) public restricted {
        Request storage request = requestList[index];

        require(
            request.approvalCount > (approversCount / 2),
            "This request needs more approvals before it can be finalized"
        );
        require(!request.complete, "This request has already been finalized");

        payable(request.recipient).transfer(request.value);
        request.complete = true;
    }

    function getSummary()
        public
        view
        returns (uint256, uint256, uint256, uint256, address)
    {
        return (
            minimumContribution,
            address(this).balance,
            numRequests,
            approversCount,
            manager
        );
    }

    function getRequestsCount() public view returns (uint256) {
        return numRequests;
    }
}

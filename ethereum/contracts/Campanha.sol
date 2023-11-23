//SPDX-License-Identifier: MIT
pragma solidity ^0.4.25;

contract CampanhaFactory {
    address[] public deployedCampaigns;

    function createCampanha(uint minimum) public {
        address newCampaign = address(new Campanha(minimum, msg.sender));
        deployedCampaigns.push(newCampaign);
    }

    function getDeployedCampaigns() public view returns (address[] memory) {
        return deployedCampaigns;
    }
}

contract Campanha {
    struct Request {
        string description;
        uint value;
        address recipient;
        bool complete;
        mapping(address => bool) approvals;
        uint approvalCount;
    }

    Request[] public requests;
    address public manager;
    uint public minimumContribution;
    mapping(address => bool) public contributers;
    uint public approversCount;

    modifier restricted() {
        require(msg.sender == manager);
        _;
    }

    constructor(uint minimum, address creator) public {
        manager = creator;
        minimumContribution = minimum;
    }

    function contribute() public payable {
        require(msg.value > minimumContribution);
        contributers[msg.sender] = true;
        approversCount++;
    }

    function createRequest(
        string memory desc,
        uint val,
        address rec
    ) public restricted {
        Request memory newRequest;
        newRequest.description = desc;
        newRequest.value = val;
        newRequest.recipient = rec;
        newRequest.complete = false;
        newRequest.approvalCount = 0;
        requests.push(newRequest);
    }

    function approveRequest(uint index) public {
        Request storage requester = requests[index];

        require(contributers[msg.sender], "Sender is not a contributer");
        require(!requester.approvals[msg.sender]);

        requester.approvals[msg.sender] = true;
        requester.approvalCount++;
    }

    function finalizeRequest(uint index) public restricted {
        Request storage request = requests[index];

        require(request.approvalCount > (approversCount / 2));
        require(!request.complete);

        request.recipient.transfer(request.value);
        request.complete = true;
    }
}

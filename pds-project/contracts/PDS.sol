// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract PDS {

    // ================= BENEFICIARY =================

    struct Beneficiary {
        string rationCard;
        string name;
        uint entitlement;
    }

    Beneficiary[] public beneficiaries;

    // Prevent duplicate ration cards
    mapping(string => bool) public beneficiaryExists;

    // Register beneficiary
    function registerBeneficiary(
        string memory _rationCard,
        string memory _name,
        uint _entitlement
    ) public {

        // Check duplicate entry
        require(
            !beneficiaryExists[_rationCard],
            "Beneficiary already exists"
        );

        beneficiaries.push(
            Beneficiary(
                _rationCard,
                _name,
                _entitlement
            )
        );

        beneficiaryExists[_rationCard] = true;
    }

    // Get all beneficiaries
    function getAllBeneficiaries()
        public
        view
        returns (Beneficiary[] memory)
    {
        return beneficiaries;
    }

    // ================= TRANSFERS =================

    struct Transfer {
        string from;
        string to;
        uint quantity;
        uint timestamp;
    }

    Transfer[] public transfers;

    // Add grain transfer
    function addTransfer(
        string memory _from,
        string memory _to,
        uint _quantity
    ) public {

        transfers.push(
            Transfer(
                _from,
                _to,
                _quantity,
                block.timestamp
            )
        );
    }

    // Get all transfer logs
    function getAllTransfers()
        public
        view
        returns (Transfer[] memory)
    {
        return transfers;
    }
}
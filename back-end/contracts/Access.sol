// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

contract Access {

    mapping (address => mapping (address => bool)) public consent;
    mapping (address => string) public data;

    function give_consent(address _user,address _recipient,string calldata url) external {
        require(msg.sender == _user, "only user can give access");
        require(consent[_user][_recipient] == false,"you already have access");
        consent[_user][_recipient] = true;
        data[_recipient] = url;
    }

    function check_consent(address _user,address _recipient) external view  returns (bool){
        bool check = consent[_user][_recipient];
        return check;
    }

    //   function add(address _user,string memory url) external {
    //     data[_user] = url;
    // }

    function getData(address _user,address _recipient) external view returns (string memory _data ){
        if(consent[_user][_recipient] == true){
         _data = data[_recipient];
       }
       return _data;
    }


    function revoke_consent(address _user,address _recipient) external {
        require(msg.sender == _user, "only user can revoke access");
        require(consent[_user][_recipient] == true,"recipient dont have access");
        consent[_user][_recipient] = false;
    }

}
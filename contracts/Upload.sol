// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract Upload {
  
  struct Access{
     address user; 
     bool access; //true or false
  }
  mapping(address=>string[]) value; // Mapping to store URLs for each user
  mapping(address=>mapping(address=>bool)) ownership; // Mapping to store ownership status between users
  mapping(address=>Access[]) accessList; // Mapping to store access permissions for each user
  mapping(address=>mapping(address=>bool)) previousData; // Mapping to store previous data access status between users

  function add(address _user,string memory url) external {
      value[_user].push(url); // Add URL to the user's list of URLs
  }
  
  function allow(address user) external {
      ownership[msg.sender][user]=true; // Grant ownership to the specified user
      
      if(previousData[msg.sender][user]){
         for(uint i=0;i<accessList[msg.sender].length;i++){
             if(accessList[msg.sender][i].user==user){
                  accessList[msg.sender][i].access=true; // Grant access to the specified user
             }
         }
      }else{
          accessList[msg.sender].push(Access(user,true)); // Add the user to the access list with access granted
          previousData[msg.sender][user]=true; // Set previous data access status to true
      }
  }
  
  function disallow(address user) public{
      ownership[msg.sender][user]=false; // Revoke ownership from the specified user
      
      for(uint i=0;i<accessList[msg.sender].length;i++){
          if(accessList[msg.sender][i].user==user){ 
              accessList[msg.sender][i].access=false; // Revoke access from the specified user
          }
      }
  }

  function display(address _user) external view returns(string[] memory){
      require(_user==msg.sender || ownership[_user][msg.sender],"You don't have access"); // Check if the caller has access to the user's data
      return value[_user]; // Return the URLs associated with the user
  }

  function shareAccess() public view returns(Access[] memory){
      return accessList[msg.sender]; // Return the access permissions for the caller
  }
}

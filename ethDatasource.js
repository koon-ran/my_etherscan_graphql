const { RESTDataSource } = require("apollo-datasource-rest"); //RESTDataSource is a class that we will extend

//Vitalik's Ethereum Address
const eth_address = "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045";

//Etherscan Data Source Class
class EtherDataSource extends RESTDataSource { 
  constructor() { //This is the constructor function that we will use to initialize our RESTDataSource
    super();
    this.baseURL = "https://api.etherscan.io/api"; 
  }

  async etherBalanceByAddress() {
    // Make GET request to Etherscan API To get ether balance for address
    return this.get(
      `?module=account&action=balance&address=${eth_address}&tag=latest&apikey=${process.env.ETHERSCAN_API}`
    );
  }


  async totalSupplyOfEther() {  //This is the function that will return the total supply of ether
    return this.get( 
      `?module=stats&action=ethsupply&apikey=${process.env.ETHERSCAN_API}`
    );
  }

  //Paste Code Here For New API Endpoints
  async getLatestEthereumPrice() { //This is the function that will return the latest Ethereum price
    return this.get( 
      `?module=stats&action=ethprice&apikey=${process.env.ETHERSCAN_API}` 
    );
  }

  async getBlockConfirmationTime() {
    return this.get( //This is the function that will return the block confirmation time
      `?module=gastracker&action=gasestimate&gasprice=2000000000&apikey=${process.env.ETHERSCAN_API}`
    );
  }
}

module.exports = EtherDataSource;

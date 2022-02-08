async function getSaleConfig(contract) {
    let response = {"result":undefined, "error":undefined}
    await contract.methods.saleConfig().call(function(error, result){
        response.error = error
        response.result = result
    })
    return response
}

async function getNextTokenId(contract) {
    let response = {"result":undefined, "error":undefined}
    await contract.methods.nextTokenId().call(function(error, result){
        response.error = error
        response.result = result
    })
    return response
}

function getContract() {    
    if(window.ethereum === undefined) {
        return {"error": "Metamask not installed."}
    }
    try {            
        let web3 = new Web3(window.ethereum);
        let contract = new web3.eth.Contract(
            abi,
            contractAddress
        )
        return {"result": contract}
    } catch (error) {
        console.error("web3: " + error)
        return {"error": "Unable to load metamask."}
    }
}

async function connectMetamask() {
    let response = {"result":undefined, "error":undefined}
    await window.ethereum.request({ method: 'eth_requestAccounts' })
        .then(function(accounts){
            if(accounts.length < 1){
                response.error = "no accounts"
                return
            }
            response.result = accounts[0]
        })
        .catch((error) => {
            console.error("metamask: " + error)
            if (error.code === 4001) {
                // EIP-1193 userRejectedRequest error
                // If this happens, the user rejected the connection request.
            }
            response.error = error
        })
    return response
}

jQuery(function() { 
    $('.carousel').slick({
        dots: false,
        arrows: false, 
        slidesToShow: 1, 
        slidesToScroll: 1, 
        centerMode: false, 
        draggable: false, 
        speed: 3500, 
        autoplay: true, 
        autoplaySpeed: 0, 
        vertical: true, 
        infinite: true, 
        pauseOnHover: false, 
        cssEase: 'linear',
    });

    let contract = getContract();
    if(contract.error != undefined) {
        // TODO: Special UI for users with no metamask
        $("#status").html("Please install <a href='https://metamask.io/download.html'>metamask</a> to mint.");
        console.error("metamask error: " + contract.error)
        return
    }
    if(window.ethereum.networkVersion == 4){
        $("#status").html("You are on rinkeby testnet")
    }
    main(contract.result);
});

async function main(contract) {
    let saleConfigRequest = getSaleConfig(contract);
    let saleConfigResponse = await saleConfigRequest;
    if(saleConfigResponse.result === undefined){
        console.log("asdf")
        console.error(saleConfigResponse);
        return;
    }
    let saleConfig = saleConfigResponse.result;
    console.log(saleConfig);
    $('#mintcount').attr("max", Number(saleConfig.maxPerPurchase));
    countdown(saleConfig.startTime, function(){
        $("#countdownlabel").attr("hidden", true);
        countSales(contract);
        
        $('#mintform').removeAttr('hidden');
        $('#mintbutton').on('click', async function(){
            let count = Number($("#mintcount").val());
            if(count > saleConfig.maxPerPurchase) {
                $("#status").html("Sorry. You can't mint more than " + saleConfig.maxPerPurchase + " bears.")
                return
            }
            let accountRequest = connectMetamask()
            let accountResponse = await accountRequest
            if(accountResponse.error != undefined) {
                console.error("account request error: " + accountResponse.error)
                $("#status").html("Unable to load account. Please connect to metamask.")
                return
            }
            countSales(contract);
            mint(contract, accountResponse.result, saleConfig.price, count);
        });
    });
}

function countdown(countDownDate, callback){
    // Update the count down every 1 second
    var x = setInterval(function() {

        // Get today's date and time
        var now = new Date().getTime();

        // Find the distance between now and the count down date
        var distance = countDownDate - now;

        // countdown finished
        if (distance <= 0) {
            clearInterval(x);
            callback();
            return;
        }

        // Time calculations for days, hours, minutes and seconds
        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);

        $('#bigstatus').html(days + "d " + hours + "h "
        + minutes + "m " + seconds + "s ");
    }, 1000);
}

async function mint(contract, account, price, count) {
    let cost = count*price;

    contract.methods.salemint(count).send({from: account, value: cost})
        .on('transactionHash', function(hash){
            console.log('transactionHash' + hash)
            $("#status").html("<a href="+etherscanroot()+"/tx/" + hash+">Pending</a>") 
            countSales(contract);
        })
        .on('receipt', function(receipt){
            console.log('receipt' + JSON.stringify(receipt))
            $("#status").html("Congratulations! Your bear is on <a href='"+opensearoot()+"/collection/the-bear-necessities-project'>opensea</a>.")
            countSales(contract);
        })
        .on('error', function(error, receipt) { // If the transaction was rejected by the network with a receipt, the second parameter will be the receipt.
            console.log('error' + error)
            $("#status").html(error)
            countSales(contract);
        })
}

async function countSales(contract) {
    let nextTokenIdRequest = getNextTokenId(contract);
    let nextTokenIdResponse = await nextTokenIdRequest;
    if(nextTokenIdResponse.result === undefined){
        console.error("contract error: " + nextTokenIdResponse);
        $("#status").html("An error occurred. Please refresh.");
        return;
    }
    let nextTokenId = Number(nextTokenIdResponse.result);
    if(nextTokenId >= 10000) {
        $('#bigstatus').html("Sold out");
        return
    }
    $('#bigstatus').html(nextTokenId + "/10,000 sold");
}


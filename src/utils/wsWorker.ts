const startWS = async function () {
//     const ws = new WebSocket('wss://ws.bitstamp.net');
//
//     // Currency pairs: btcusd, btceur, btcgbp, btcpax, btcusdc, gbpusd, gbpeur, eurusd, xrpusd, xrpeur, xrpbtc, xrpgbp, xrppax, ltcusd, ltceur, ltcbtc, ltcgbp, ethusd, etheur, ethbtc, ethgbp, ethpax, ethusdc, bchusd, bcheur, bchbtc, bchgbp, paxusd, paxeur, paxgbp, xlmbtc, xlmusd, xlmeur, xlmgbp, linkusd, linkeur, linkgbp, linkbtc, linketh, omgusd, omgeur, omggbp, omgbtc, usdcusd, usdceur
//     const subscribeMsg = {
//         "event": "bts:subscribe",
//         "data": {
//             "channel": "live_trades_btcusd"
//         }
//     };
//
//     const unSubscribeMsg = {
//         "event": "bts:unsubscribe",
//         "data": {
//             "channel": "live_trades_btcusd"
//         }
//     };
//
//     const reconnectMsg = {
//         "event": "bts:request_reconnect",
//         "channel": "",
//         "data": ""
//     }
//
//     const reconnectTimesConfig = 3;
//     const reconnectTimes = 0;
//
//     const compare = (nowPrice: number, alertSetting: AlertSetting): boolean => {
//         const {price} = alertSetting;
//         console.log('---nowPrice,price', nowPrice, price)
//         switch (alertSetting.comparator) {
//             case "eq":
//                 return nowPrice === price
//             case "ge":
//                 return nowPrice >= price
//             case "gt":
//                 return nowPrice > price
//             case "le":
//                 return nowPrice <= price
//             case "lt":
//                 return nowPrice < price
//             case "ne":
//                 return nowPrice !== price
//             default:
//                 return false
//         }
//     }
//
//     const onWSOpen = (e: Event) => {
//         console.log('---onWSOpen');
//         ws.send(JSON.stringify(subscribeMsg));
//     }
//     ws.addEventListener('open', onWSOpen)
//
//     const onWSMessage = (e: MessageEvent) => {
//         console.log('---onWSMessage');
//         const data = JSON.parse(e.data).data;
//         const nowPrice = data.price;
//         if (nowPrice) {
//             for (let i in alertSettings) {
//                 console.log('---i', i)
//                 const comparedResult = compare(nowPrice, alertSettings[i]);
//                 console.log('---comparedResult', comparedResult)
//                 // todo
//                 if (comparedResult) {
//                     // schedulePushNotification(data)
//                     //     .then(() => {
//                     //         _.remove(alertSettings, (item) => {
//                     //             return item.id === alertSettings[i].id
//                     //         })
//                     //         console.log('---alertSettings', alertSettings)
//                     //     });
//                 }
//             }
//         }
//     };
//
//     ws.addEventListener('message', onWSMessage)
//
//     const onWSError = (e: Event) => {
//         console.log('---onWSError', e);
//         if (reconnectTimes < reconnectTimesConfig) {
//             ws.send(JSON.stringify(reconnectMsg))
//         }
//     };
//
//     ws.addEventListener('error', onWSError)
//
//     const onWSClose = (e: CloseEvent) => {
//         console.log('---onWSClose', e);
//     };
//
//     ws.addEventListener('close', onWSClose)
//
//     return () => {
//         ws.send(JSON.stringify(unSubscribeMsg));
//         ws.close();
//         setTimeout(() => {
//             ws.removeEventListener('open', onWSOpen);
//             ws.removeEventListener('message', onWSMessage);
//             ws.removeEventListener('error', onWSError);
//             ws.removeEventListener('close', onWSClose);
//         }, 600)
//     };
}

export {
    startWS
}

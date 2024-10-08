document.getElementById('connect').addEventListener('click', async () => {
    try {
        // 請求連接藍牙設備
        const device = await navigator.bluetooth.requestDevice({
            filters: [{ services: ['battery_service'] }]
        });

        // 顯示連接狀態
        document.getElementById('status').textContent = `Connected to: ${device.name}`;

        // 連接 GATT 伺服器
        const server = await device.gatt.connect();
        
        // 獲取服務
        const service = await server.getPrimaryService('battery_service');

        // 獲取特徵值
        const characteristic = await service.getCharacteristic('battery_level');

        // 讀取特徵值
        const value = await characteristic.readValue();
        const batteryLevel = value.getUint8(0);

        // 顯示電池電量
        document.getElementById('status').textContent += `\nBattery Level: ${batteryLevel}%`;
    } catch (error) {
        console.error(error);
        document.getElementById('status').textContent = 'Failed to connect: ' + error;
    }
});
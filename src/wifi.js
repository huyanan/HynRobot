const childProcess = require('child_process');
const wifiName = require('wifi-name');

// 宿舍wifi
const dorm_wifi = 'TP-LINK_5GHz_9DA5E3';
// 公司wifi newstage001_5G
const company_newstage001_5G_wifi = 'newestage001_5G';
// 公司wifi stager3_5G
const company_stager3_5G_wifi = 'stager3_5G'

var wifi_status = ''

startWifiRobot();

function startWifiRobot () {
  setInterval(() => {
    checkWifi();
  }, 1000)
}

function execBat (ssid, batName) {
  var url = require.resolve(batName);
  var dirName = process.cwd();
  wifi_status = ssid;
  var child_proc = childProcess.execFile(url, function(error, stdout, stderr) {
    if (error !== null) {
      console.log('exec error: ' + error);
    }
    else console.log('成功执行指令!');
  });
}

function checkWifi () {
  wifiName().then(ssid => {
    if (wifi_status == ssid) {
      return
    }
    console.log(ssid);
    if (ssid == dorm_wifi) {
      execBat(ssid, './dorm_static_ip.bat');
    } else if (ssid == company_newstage001_5G_wifi) {
      execBat(ssid, './company_newstage001_static_ip.bat');
    } else if (ssid == company_stager3_5G_wifi) {
      execBat(ssid, './company_stager3_5G_static_ip.bat');
    }
  });
}
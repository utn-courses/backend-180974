// const dataIp = {
//   'Wi-Fi': [
//     {
//       address: 'fe80::dda1:72c:642:1b58',
//       netmask: 'ffff:ffff:ffff:ffff::',
//       family: 'IPv6',
//       mac: 'd0:37:45:7c:39:8d',
//       internal: false,
//       cidr: 'fe80::dda1:72c:642:1b58/64',
//       scopeid: 18
//     },
//     {
//       address: '192.168.1.3',
//       netmask: '255.255.255.0',
//       family: 'IPv4',
//       mac: 'd0:37:45:7c:39:8d',
//       internal: false,
//       cidr: '192.168.1.3/24'
//     }
//   ],
//   'Loopback Pseudo-Interface 1': [
//     {
//       address: '::1',
//       netmask: 'ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff',
//       family: 'IPv6',
//       mac: '00:00:00:00:00:00',
//       internal: true,
//       cidr: '::1/128',
//       scopeid: 0
//     },
//     {
//       address: '127.0.0.1',
//       netmask: '255.0.0.0',
//       family: 'IPv4',
//       mac: '00:00:00:00:00:00',
//       internal: true,
//       cidr: '127.0.0.1/8'
//     }
//   ],
//   test: [1, 2, 3]
// }

// for (const nombre in dataIp) {
//   for (const red of dataIp[nombre]) {
//     console.log(red.address)
//   }
// }

// frutilla | naranja | melón | pomelo
const frutas = ["frutilla", "naranja", "melón", "pomelo"]
console.log(frutas.join(" - "))

const ips = ["111.222.3.4", "111.333.4.5"]
console.log(ips.join(", "))
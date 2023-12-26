const ipList = document.getElementById("ip-list");
const cutOffButton = document.getElementById("cut-off");
const status = document.getElementById("status");

// Mengambil daftar IP address yang aktif di lokal jaringan
const getActiveIpAddresses = async () => {
  const response = await fetch("http://192.168.1.1/api/get-active-ip-addresses");
  const data = await response.json();
  return data.ip_addresses;
};

// Melakukan cut off pada IP address yang dipilih
const cutOffIpAddress = async (ipAddress) => {
  const response = await fetch("http://192.168.1.1/api/cut-off-ip-address", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ip_address }),
  });
  const data = await response.json();
  if (data.success) {
    status.textContent = "Status: Tidak Aktif";
  } else {
    status.textContent = "Status: Aktif";
  }
};

// Menginisialisasi
getActiveIpAddresses().then((ipAddresses) => {
  ipAddresses.forEach((ipAddress) => {
    const option = document.createElement("option");
    option.value = ipAddress;
    option.textContent = ipAddress;
    ipList.appendChild(option);
  });

  cutOffButton.addEventListener("click", () => {
    const ipAddress = ipList.value;
    cutOffIpAddress(ipAddress);
  });
});

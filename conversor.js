const apiKey = "WAs4Fafk9sbtXLAVYo7e2cKQiXvduNaP";

function convertCurrency() {
  const amount = parseFloat(document.getElementById("inputUSD").value);
  if (!amount) {
    alert("Por favor ingrese un número válido en USD");
    return;
  }

  $.ajax({
    url: `https://api.apilayer.com/exchangerates_data/convert?to=ars&from=usd&amount=${amount}`,
    type: "GET",
    headers: { apikey: apiKey },
    dataType: "json",
    success: function(result) {
      const rate = result.info.rate;
      document.getElementById("outputARS").value = (amount * rate).toFixed(0); 
    },
    error: function(xhr, status, error) {
      document.getElementById("error").innerHTML = error;
    }
  });
}

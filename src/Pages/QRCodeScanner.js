// src/components/QRCodeScanner.js
import React, { useState } from 'react';
import { QrReader } from 'react-qr-reader';

const QRCodeScanner = () => {
  const [scanResult, setScanResult] = useState('');
  const [scanError, setScanError] = useState('');

  const handleScan = (data) => {
    if (data) {
      setScanResult(data);
      setScanError('');
      console.log('Scanned QR code data:', data);
    }
  };

  const handleError = (err) => {
    setScanError(err.message || 'Error scanning QR code');
    console.error('Error scanning QR code:', err);
  };

  const handleUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      const imageData = reader.result;
      // Simulate scanning the uploaded image
      // Ideally, you would use a library to decode the QR code from the image
      handleScan(imageData); // Replace with actual scanning logic
    };
    reader.readAsDataURL(file);
  };

  return (
    <div>
      <h3>QR Code Scanner</h3>
      <QrReader
        delay={300}
        onError={handleError}
        onResult={(result, error) => {
          if (!!result) {
            handleScan(result.text);
          }

          if (!!error) {
            handleError(error);
          }
        }}
        facingMode="environment"
        style={{ width: '100%' }}
      />
      <p>Scanned Data: {scanResult}</p>
      {scanError && <p style={{ color: 'red' }}>Error: {scanError}</p>}
      <input type="file" accept="image/*" onChange={handleUpload} />
    </div>
  );
};

export default QRCodeScanner;

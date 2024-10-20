import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./ProductFetcher.css"; // Custom CSS for extra styling
import Chart from "react-apexcharts";

const ProductFetcher = () => {
  const [url, setUrl] = useState("");
  const [product, setProduct] = useState(null);

  const [options, setOptions] = useState({
    chart: {
      type: "area",
      stacked: false,
      height: 350,
      zoom: {
        type: "x",
        enabled: true,
        autoScaleYaxis: true,
      },
      toolbar: {
        autoSelected: "zoom",
      },
    },
    dataLabels: {
      enabled: false,
    },
    markers: {
      size: 0,
    },
    title: {
      text: "Stock Price Movement",
      align: "left",
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        inverseColors: false,
        opacityFrom: 0.5,
        opacityTo: 0,
        stops: [0, 90, 100],
      },
    },
    yaxis: {
      title: {
        text: "Price",
      },
    },
    xaxis: {
      type: "xtime",
    },
    tooltip: {
      shared: false,
    },
  });
  const [series, setseries] = useState([
    {
      name: "Price History",
      data: [
        { y: 125000, x: "2024-10-20" },
        { y: 67500, x: "2024-10-21" },
        { y: 98000, x: "2024-10-22" },
        { y: 54000, x: "2024-10-23" },
        { y: 112000, x: "2024-10-24" },
        { y: 83000, x: "2024-10-25" },
        { y: 64000, x: "2024-10-26" },
        { y: 150000, x: "2024-10-27" },
        { y: 89000, x: "2024-10-28" },
        { y: 78000, x: "2024-10-29" },
        { y: 115000, x: "2024-10-30" },
        { y: 56000, x: "2024-10-31" },
        { y: 72000, x: "2024-11-01" },
        { y: 65000, x: "2024-11-02" },
        { y: 93000, x: "2024-11-03" },
        { y: 100000, x: "2024-11-04" },
        { y: 45000, x: "2024-11-05" },
        { y: 125000, x: "2024-11-06" },
        { y: 135000, x: "2024-11-07" },
        { y: 86000, x: "2024-11-08" },
        { y: 72000, x: "2024-11-09" },
        { y: 113000, x: "2024-11-10" },
        { y: 59000, x: "2024-11-11" },
        { y: 147000, x: "2024-11-12" },
        { y: 84000, x: "2024-11-13" },
        { y: 62000, x: "2024-11-14" },
        { y: 50000, x: "2024-11-15" },
        { y: 130000, x: "2024-11-16" },
        { y: 71000, x: "2024-11-17" },
        { y: 80000, x: "2024-11-18" },
        { y: 99000, x: "2024-11-19" },
        { y: 137000, x: "2024-11-20" },
        // { y: 103000, x: "2024-11-21" },
        // { y: 56000, x: "2024-11-22" },
        // { y: 62000, x: "2024-11-23" },
        // { y: 114000, x: "2024-11-24" },
        // { y: 92000, x: "2024-11-25" },
        // { y: 110000, x: "2024-11-26" },
        // { y: 75000, x: "2024-11-27" },
        // { y: 130000, x: "2024-11-28" },
        // { y: 68000, x: "2024-11-29" },
        // { y: 64000, x: "2024-11-30" },
        // { y: 104000, x: "2024-12-01" },
        // { y: 54000, x: "2024-12-02" },
        // { y: 120000, x: "2024-12-03" },
        // { y: 93000, x: "2024-12-04" },
        // { y: 101000, x: "2024-12-05" },
        // { y: 58000, x: "2024-12-06" },
        // { y: 150000, x: "2024-12-07" },
        // { y: 75000, x: "2024-12-08" },
        // { y: 89000, x: "2024-12-09" },
        // { y: 113000, x: "2024-12-10" },
        // { y: 62000, x: "2024-12-11" },
        // { y: 128000, x: "2024-12-12" },
        // { y: 90000, x: "2024-12-13" },
        // { y: 70000, x: "2024-12-14" },
        // { y: 81000, x: "2024-12-15" },
        // { y: 49000, x: "2024-12-16" },
        // { y: 95000, x: "2024-12-17" },
        // { y: 115000, x: "2024-12-18" },
        // { y: 68000, x: "2024-12-19" },
        // { y: 60000, x: "2024-12-20" },
        // { y: 130000, x: "2024-12-21" },
        // { y: 70000, x: "2024-12-22" },
        // { y: 85000, x: "2024-12-23" },
        // { y: 92000, x: "2024-12-24" },
        // { y: 78000, x: "2024-12-25" },
        // { y: 64000, x: "2024-12-26" },
        // { y: 127000, x: "2024-12-27" },
        // { y: 150000, x: "2024-12-28" },
        // { y: 49000, x: "2024-12-29" },
        // { y: 67000, x: "2024-12-30" },
        // { y: 110000, x: "2024-12-31" },
      ],      
    },
  ]);

  const fetchProductDetails = async () => {
    try {
      const response = await axios.post(
        "https://mern-demo-cwtr.onrender.com/api/products/fetch-product",
        { url }
      );
      setProduct(response.data);
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow-lg p-4">
        <div>
          <div id="chart">
            <Chart options={options} series={series} type="area" height={350} />
          </div>
          <div id="html-dist"></div>
        </div>
        <header className="text-center">
          <h1 className="display-5 text-primary mb-3">
            Flipkart Price Tracker
          </h1>
          <p className="text-muted">
            Track prices and stay upxd on your favorite products.
          </p>
        </header>

        <div className="input-group mb-4 w-75 mx-auto">
          <input
            type="text"
            className="form-control form-control-lg"
            placeholder="Enter Flipkart Product URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <button
            className="btn btn-primary btn-lg"
            onClick={fetchProductDetails}
          >
            Fetch Details
          </button>
        </div>

        {product && (
          <div className="product-details mt-5">
            <div className="row">
              <div className="col-md-4 text-center">
                {/* Display Product Image */}
                <img
                  src={product.imageUrl}
                  alt={product.title}
                  className="img-fluid rounded shadow-sm mb-3"
                  style={{ maxHeight: "300px", objectFit: "contain" }}
                />
              </div>
              <div className="col-md-8">
                <h2 className="text-info">{product.title}</h2>
                <p className="lead text-muted mb-4">{product.description}</p>

                <h4 className="text-success">
                  Current Price: ₹{product.currentPrice}
                </h4>

                <h5 className="mt-4">Price History:</h5>
                <ul className="list-group list-group-flush">
                  {product.priceHistory.map((entry, index) => (
                    <li
                      key={index}
                      className="list-group-item d-flex justify-content-between align-items-center"
                    >
                      ₹{entry.price}
                      <span className="text-muted">
                        {new x(entry.x).toLocaleString()}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductFetcher;

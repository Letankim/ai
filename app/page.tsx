"use client"

import { useState } from "react"

export default function Home() {
  const [proceed, setProceed] = useState(false)


const handleGoBack = () => {
  setProceed(false);
  window.location.href = "https://hms-client-psi.vercel.app/";
};


  if (proceed) {
    return (
      <main
        style={{
          display: "flex",
          minHeight: "100vh",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "16px", // p-4
          backgroundColor: "#f0fdf4", // from-green-50
          backgroundImage: "linear-gradient(to bottom right, #f0fdf4, #ecfdf5)", // to-emerald-100
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: "480px", // max-w-md
            textAlign: "center",
            boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)", // shadow-lg
            border: "1px solid #4ade80", // border-green-400
            borderRadius: "8px",
            backgroundColor: "#ffffff",
            padding: "24px",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginBottom: "16px", // space-y-4
              paddingBottom: "16px",
              borderBottom: "1px solid #e5e7eb",
            }}
          >
            <span style={{ fontSize: "64px", color: "#16a34a", marginBottom: "16px" }}>&#10003;</span>{" "}
            {/* CheckCircle icon */}
            <h1 style={{ fontSize: "30px", fontWeight: "bold", color: "#15803d", marginBottom: "8px" }}>
              Access Granted
            </h1>{" "}
            {/* text-3xl font-bold text-green-700 */}
          </div>
          <div
            style={{
              marginBottom: "24px", // space-y-4
              padding: "0 16px",
            }}
          >
            <p style={{ fontSize: "18px", color: "#374151", marginBottom: "8px" }}>
              Bạn đã chấp nhận rủi ro và tiếp tục.
            </p>{" "}
            {/* text-lg text-gray-700 */}
            <p style={{ fontSize: "16px", color: "#4b5563", fontWeight: "500" }}>
              Vui lòng thận trọng khi điều hướng phần này.
            </p>{" "}
            {/* text-md text-gray-600 font-medium */}
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              paddingTop: "24px", // pt-6
            }}
          >
            <button
              onClick={handleGoBack}
              style={{
                backgroundColor: "#16a34a", // bg-green-600
                color: "#ffffff",
                padding: "12px 24px",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
                fontSize: "16px",
                fontWeight: "600",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "background-color 0.2s ease-in-out",
              }}
              onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#147b3d")} // hover:bg-green-700
              onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#16a34a")}
            >
              <span style={{ marginRight: "8px" }}>&#8592;</span> Quay lại Cảnh báo
            </button>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main
      style={{
        display: "flex",
        minHeight: "100vh",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "16px", // p-4
        backgroundColor: "#fffafa", // from-red-50
        backgroundImage: "linear-gradient(to bottom right, #fffafa, #fff1f2)", // to-rose-100
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "576px", // max-w-lg
          textAlign: "center",
          boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)", // shadow-xl
          border: "1px solid #ef4444", // border-red-500
          borderRadius: "8px",
          backgroundColor: "#ffffff",
          padding: "24px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginBottom: "16px", // space-y-4
            paddingBottom: "16px",
            borderBottom: "1px solid #e5e7eb",
          }}
        >
          <span style={{ fontSize: "64px", color: "#dc2626", marginBottom: "16px" }}>&#9888;</span>{" "}
          {/* TriangleAlert icon */}
          <h1 style={{ fontSize: "30px", fontWeight: "bold", color: "#b91c1c", marginBottom: "8px" }}>
            Truy cập bị hạn chế: Cảnh báo quan trọng!
          </h1>{" "}
          {/* text-3xl font-bold text-red-700 */}
          <p style={{ fontSize: "18px", color: "#374151" }}>
            Trang này hiện đang được phát triển hoặc chỉ dành cho nhân viên được ủy quyền.
          </p>{" "}
          {/* text-lg text-gray-700 */}
        </div>
        <div
          style={{
            marginBottom: "24px", // space-y-6
            padding: "0 16px",
          }}
        >
          <p style={{ fontSize: "16px", color: "#1f2937", lineHeight: "1.6" }}>
            Tiếp tục mà không có sự cho phép thích hợp có thể dẫn đến lỗi không mong muốn, không nhất quán dữ liệu hoặc
            rủi ro bảo mật.
          </p>
          <div style={{ textAlign: "left", marginTop: "24px" }}>
            <h3 style={{ fontSize: "20px", fontWeight: "600", color: "#dc2626", marginBottom: "8px" }}>
              Những điểm cần lưu ý:
            </h3>
            <ul style={{ listStyleType: "disc", listStylePosition: "inside", color: "#374151", lineHeight: "1.5" }}>
              <li>Không thể đảm bảo tính toàn vẹn của dữ liệu.</li>
              <li>Các tính năng có thể không đầy đủ hoặc không hoạt động.</li>
              <li>Hành động của bạn có thể ảnh hưởng đến quá trình phát triển đang diễn ra.</li>
              <li>Các lỗ hổng bảo mật có thể tồn tại.</li>
            </ul>
          </div>
          <p style={{ fontWeight: "600", color: "#991b1b", fontSize: "18px", marginTop: "24px" }}>
            Vui lòng xác nhận bạn hiểu và chấp nhận những rủi ro này trước khi tiếp tục.
          </p>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column", // sm:flex-row
            justifyContent: "center",
            gap: "16px", // gap-4
            paddingTop: "24px", // pt-6
          }}
        >
          <button
            onClick={handleGoBack}
            style={{
              backgroundColor: "transparent",
              border: "1px solid #ef4444", 
              color: "#dc2626",
              padding: "12px 24px", 
              borderRadius: "6px",
              cursor: "pointer",
              fontSize: "16px", 
              fontWeight: "600", 
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "background-color 0.2s ease-in-out, color 0.2s ease-in-out",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = "#fef2f2" 
              e.currentTarget.style.color = "#b91c1c" 
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = "transparent"
              e.currentTarget.style.color = "#dc2626"
            }}
          >
            <span style={{ marginRight: "8px" }}>&#8592;</span> Cook now
          </button>
        </div>
      </div>
    </main>
  )
}

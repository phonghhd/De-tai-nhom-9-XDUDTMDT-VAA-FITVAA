-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 20, 2024 at 06:38 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `quan_ly_ve_xe`
--

-- --------------------------------------------------------

--
-- Table structure for table `chuyen_xe`
--

CREATE TABLE `chuyen_xe` (
  `ID` int(11) NOT NULL,
  `DIEM_KHOI_HANH` varchar(50) NOT NULL,
  `DIEM_DEN` varchar(50) NOT NULL,
  `THOI_GIAN_KHOI_HANH` datetime NOT NULL,
  `NGAY_VE` datetime NOT NULL,
  `GIA_VE` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `chuyen_xe`
--

INSERT INTO `chuyen_xe` (`ID`, `DIEM_KHOI_HANH`, `DIEM_DEN`, `THOI_GIAN_KHOI_HANH`, `NGAY_VE`, `GIA_VE`) VALUES
(1, 'Hải Phòng', 'Hà Nội', '2024-10-25 11:24:58', '2024-12-09 22:00:00', 300000.00),
(2, 'Hà Nội', 'Hồ Chí Minh', '2024-10-25 11:24:58', '2024-11-13 16:00:00', 1430000.00),
(3, 'Hà Nội', 'Hồ Chí Minh', '2024-10-30 08:00:00', '2024-12-03 08:00:00', 1500000.00),
(4, 'Nha Trang', 'Hà Nội', '2024-10-28 10:00:00', '2024-12-12 06:00:00', 600000.00),
(5, 'Hồ Chí Minh', 'Đà Lạt', '2024-10-29 09:00:00', '2024-11-28 16:00:00', 300000.00),
(6, 'Hải Phòng', 'Đà Nẵng', '2024-10-29 11:00:00', '2024-12-25 09:00:00', 650000.00),
(7, 'Hồ Chí Minh', 'Nha Trang', '2024-10-27 11:00:00', '2024-10-30 11:00:00', 450000.00),
(8, 'Ninh Bình', 'Bình Phước', '2024-10-25 17:46:48', '2025-10-25 17:46:48', 650000.00);

-- --------------------------------------------------------

--
-- Table structure for table `dat_cho`
--

CREATE TABLE `dat_cho` (
  `ID` int(11) NOT NULL,
  `ID_CHUYEN_XE` int(11) DEFAULT NULL,
  `TEN_KHACH_HANG` varchar(255) DEFAULT NULL,
  `SO_DIEN_THOAI` varchar(20) DEFAULT NULL,
  `NGAY_DAT` timestamp NOT NULL DEFAULT current_timestamp(),
  `SO_CHO` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `dat_cho`
--

INSERT INTO `dat_cho` (`ID`, `ID_CHUYEN_XE`, `TEN_KHACH_HANG`, `SO_DIEN_THOAI`, `NGAY_DAT`, `SO_CHO`) VALUES
(1, 1, 'huyentrang', '01234567890', '2024-11-03 02:24:55', '2'),
(2, 1, 'huyentrang', '01234567890', '2024-11-03 07:15:46', '8'),
(3, 1, 'huyentrang', '01234567890', '2024-11-03 13:25:59', '2'),
(4, 1, 'huyentrang', '01234567890', '2024-11-03 13:27:24', '14'),
(5, 1, 'huyentrang', '01234567890', '2024-11-04 16:19:44', '12');

-- --------------------------------------------------------

--
-- Table structure for table `dat_ve`
--

CREATE TABLE `dat_ve` (
  `ID` int(11) NOT NULL,
  `ID_CHUYEN_XE` int(11) NOT NULL,
  `TEN_KHACH_HANG` varchar(50) NOT NULL,
  `SO_DIEN_THOAI` varchar(15) NOT NULL,
  `NGAY_DAT` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `dat_ve`
--

INSERT INTO `dat_ve` (`ID`, `ID_CHUYEN_XE`, `TEN_KHACH_HANG`, `SO_DIEN_THOAI`, `NGAY_DAT`) VALUES
(1, 1, 'huyentrang', '01234567890', '2024-10-26 02:01:10'),
(2, 1, 'huyentrang', '01234567890', '2024-10-29 12:44:05'),
(3, 1, 'huyentrang', '01234567890', '2024-10-29 12:47:58'),
(4, 1, 'huyentrang', '01234567890', '2024-10-29 12:52:47'),
(5, 1, 'huyentrang', '01234567890', '2024-10-29 15:08:17');

-- --------------------------------------------------------

--
-- Table structure for table `gio_hang`
--

CREATE TABLE `gio_hang` (
  `id` int(11) NOT NULL,
  `nguoi_dung_id` int(11) DEFAULT NULL,
  `chuyen_xe_id` int(11) DEFAULT NULL,
  `so_luong` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `lich_trinh`
--

CREATE TABLE `lich_trinh` (
  `id` int(11) NOT NULL,
  `xe_id` int(11) DEFAULT NULL,
  `tuyen_id` int(11) DEFAULT NULL,
  `thoi_gian_khoi_hanh` datetime DEFAULT NULL,
  `gia` decimal(10,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `nguoi_dung`
--

CREATE TABLE `nguoi_dung` (
  `ID` int(11) NOT NULL,
  `HO_TEN` varchar(100) NOT NULL,
  `TEN_DANG_NHAP` varchar(50) NOT NULL,
  `MAT_KHAU` varchar(255) NOT NULL,
  `EMAIL` varchar(100) NOT NULL,
  `SO_PHONE` varchar(15) DEFAULT NULL,
  `GIOI_TINH` enum('NAM','NU') NOT NULL,
  `THOI_GIAN_TAO` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `nguoi_dung`
--

INSERT INTO `nguoi_dung` (`ID`, `HO_TEN`, `TEN_DANG_NHAP`, `MAT_KHAU`, `EMAIL`, `SO_PHONE`, `GIOI_TINH`, `THOI_GIAN_TAO`) VALUES
(1, 'Khổng Thị Huyền Trang', 'huyentrang12', '$2y$10$prx4ibDzIXcwRxx33Hq5uey8AXDr3fEg7gKRuN.wNjeHuHmKYRnpe', 'huyentrang@gmail.com', '01234567890', '', '2024-10-25 18:59:08');

-- --------------------------------------------------------

--
-- Table structure for table `tuyen_duong`
--

CREATE TABLE `tuyen_duong` (
  `id` int(11) NOT NULL,
  `diem_di` varchar(100) NOT NULL,
  `diem_den` varchar(100) NOT NULL,
  `thoi_gian` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `xe`
--

CREATE TABLE `xe` (
  `id` int(11) NOT NULL,
  `ten_xe` varchar(100) NOT NULL,
  `so_cho_ngoi` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `chuyen_xe`
--
ALTER TABLE `chuyen_xe`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `dat_cho`
--
ALTER TABLE `dat_cho`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `ID_CHUYEN_XE` (`ID_CHUYEN_XE`);

--
-- Indexes for table `dat_ve`
--
ALTER TABLE `dat_ve`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `ID_CHUYEN_XE` (`ID_CHUYEN_XE`);

--
-- Indexes for table `gio_hang`
--
ALTER TABLE `gio_hang`
  ADD PRIMARY KEY (`id`),
  ADD KEY `nguoi_dung_id` (`nguoi_dung_id`),
  ADD KEY `chuyen_xe_id` (`chuyen_xe_id`);

--
-- Indexes for table `lich_trinh`
--
ALTER TABLE `lich_trinh`
  ADD PRIMARY KEY (`id`),
  ADD KEY `xe_id` (`xe_id`),
  ADD KEY `tuyen_id` (`tuyen_id`);

--
-- Indexes for table `nguoi_dung`
--
ALTER TABLE `nguoi_dung`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `tuyen_duong`
--
ALTER TABLE `tuyen_duong`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `xe`
--
ALTER TABLE `xe`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `chuyen_xe`
--
ALTER TABLE `chuyen_xe`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `dat_cho`
--
ALTER TABLE `dat_cho`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `dat_ve`
--
ALTER TABLE `dat_ve`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `gio_hang`
--
ALTER TABLE `gio_hang`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `lich_trinh`
--
ALTER TABLE `lich_trinh`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `nguoi_dung`
--
ALTER TABLE `nguoi_dung`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `tuyen_duong`
--
ALTER TABLE `tuyen_duong`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `xe`
--
ALTER TABLE `xe`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `dat_cho`
--
ALTER TABLE `dat_cho`
  ADD CONSTRAINT `dat_cho_ibfk_1` FOREIGN KEY (`ID_CHUYEN_XE`) REFERENCES `chuyen_xe` (`ID`);

--
-- Constraints for table `dat_ve`
--
ALTER TABLE `dat_ve`
  ADD CONSTRAINT `dat_ve_ibfk_1` FOREIGN KEY (`ID_CHUYEN_XE`) REFERENCES `chuyen_xe` (`ID`) ON DELETE CASCADE;

--
-- Constraints for table `gio_hang`
--
ALTER TABLE `gio_hang`
  ADD CONSTRAINT `gio_hang_ibfk_1` FOREIGN KEY (`nguoi_dung_id`) REFERENCES `nguoi_dung` (`ID`),
  ADD CONSTRAINT `gio_hang_ibfk_2` FOREIGN KEY (`chuyen_xe_id`) REFERENCES `chuyen_xe` (`ID`);

--
-- Constraints for table `lich_trinh`
--
ALTER TABLE `lich_trinh`
  ADD CONSTRAINT `lich_trinh_ibfk_1` FOREIGN KEY (`xe_id`) REFERENCES `xe` (`id`),
  ADD CONSTRAINT `lich_trinh_ibfk_2` FOREIGN KEY (`tuyen_id`) REFERENCES `tuyen_duong` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

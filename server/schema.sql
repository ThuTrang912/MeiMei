-- Create Users Table
CREATE TABLE `users` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(255) NOT NULL,
  `email` VARCHAR(191) NOT NULL UNIQUE,
  `email_verified_at` TIMESTAMP NULL,
  `password` VARCHAR(255) NOT NULL,
  `remember_token` VARCHAR(100) NULL,
  `created_at` TIMESTAMP NULL,
  `updated_at` TIMESTAMP NULL
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Create Password Resets Table
CREATE TABLE `password_resets` (
  `email` VARCHAR(255) NOT NULL,
  `token` VARCHAR(255) NOT NULL,
  `created_at` TIMESTAMP NULL
);

-- Create Failed Jobs Table
CREATE TABLE `failed_jobs` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `uuid` VARCHAR(255) NOT NULL UNIQUE,
  `connection` TEXT NOT NULL,
  `queue` TEXT NOT NULL,
  `payload` LONGTEXT NOT NULL,
  `exception` LONGTEXT NOT NULL,
  `failed_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Create Personal Access Tokens Table
CREATE TABLE `personal_access_tokens` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `tokenable_type` VARCHAR(255) NOT NULL,
  `tokenable_id` BIGINT UNSIGNED NOT NULL,
  `name` VARCHAR(255) NOT NULL,
  `token` VARCHAR(64) NOT NULL UNIQUE,
  `abilities` TEXT NULL,
  `last_used_at` TIMESTAMP NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL
);

-- Create Manager Table
CREATE TABLE `manager` (
  `id_card` VARCHAR(255) PRIMARY KEY,
  `status` BOOLEAN DEFAULT TRUE,
  `role` VARCHAR(255) DEFAULT 'user',
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL,
  `deleted_at` TIMESTAMP NULL
);

-- Trigger to update `updated_at` for Manager Table
CREATE TRIGGER `update_manager_timestamp`
BEFORE UPDATE ON `manager`
FOR EACH ROW
SET NEW.`updated_at` = CURRENT_TIMESTAMP;

-- Insert data into Manager table
INSERT INTO `manager` (`id_card`, `status`, `role`) VALUES ('111111', 0, 'admin');

-- Create Group Table
CREATE TABLE `group` (
  `group_id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `group_name` VARCHAR(255) NOT NULL,
  `id_card` VARCHAR(255) NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL,
  `deleted_at` TIMESTAMP NULL
);

-- Trigger to update `updated_at` for Group Table
CREATE TRIGGER `update_group_timestamp`
BEFORE UPDATE ON `group`
FOR EACH ROW
SET NEW.`updated_at` = CURRENT_TIMESTAMP;

-- Create User Table
CREATE TABLE `user` (
  `id_card` VARCHAR(255) NOT NULL,
  `user_name` VARCHAR(255) NOT NULL,
  `furigana` VARCHAR(255) NULL,
  `birthday` DATE NOT NULL,
  `gender` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL UNIQUE,
  `password` VARCHAR(255) NOT NULL,
  `tel` VARCHAR(255) NULL,
  `post_code` VARCHAR(255) NULL,
  `address` VARCHAR(255) NULL,
  `img_url` VARCHAR(255) NULL,
  `instagram` VARCHAR(255) NULL,
  `x` VARCHAR(255) NULL,
  `description` TEXT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL,
  `deleted_at` TIMESTAMP NULL,
  CONSTRAINT `user_ibfk_1` FOREIGN KEY (`id_card`) REFERENCES `manager` (`id_card`) ON DELETE CASCADE
);

-- Trigger to update `updated_at` for User Table
CREATE TRIGGER `update_user_timestamp`
BEFORE UPDATE ON `user`
FOR EACH ROW
SET NEW.`updated_at` = CURRENT_TIMESTAMP;

-- Insert data into User table
INSERT INTO `user` (`id_card`, `user_name`, `birthday`, `gender`, `password`, `email`) VALUES ('111111', 'admin', '2023-01-01', 'other', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'meimei@gmail.com');

-- Create Company Table
CREATE TABLE `company` (
  `id_card` VARCHAR(255) PRIMARY KEY,
  `com_name` VARCHAR(255) NULL,
  `com_tel` VARCHAR(255) NULL,
  `com_fax` VARCHAR(255) NULL,
  `com_email` VARCHAR(255) NULL,
  `com_post_code` VARCHAR(255) NULL,
  `com_address` VARCHAR(255) NULL,
  `department` VARCHAR(255) NULL,
  `position` VARCHAR(255) NULL,
  `website` VARCHAR(255) NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL,
  `deleted_at` TIMESTAMP NULL,
  CONSTRAINT `company_ibfk_1` FOREIGN KEY (`id_card`) REFERENCES `user` (`id_card`) ON DELETE CASCADE
);

-- Trigger to update `updated_at` for Company Table
CREATE TRIGGER `update_company_timestamp`
BEFORE UPDATE ON `company`
FOR EACH ROW
SET NEW.`updated_at` = CURRENT_TIMESTAMP;

-- Create Contact Table
CREATE TABLE `contact` (
  `id_card` VARCHAR(255) NOT NULL,
  `contact_id` VARCHAR(255) NOT NULL,
  `like` BOOLEAN DEFAULT FALSE,
  `notification` BOOLEAN DEFAULT FALSE,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL,
  `deleted_at` TIMESTAMP NULL,
  CONSTRAINT `contact_ibfk_1` FOREIGN KEY (`id_card`) REFERENCES `user` (`id_card`) ON DELETE CASCADE
);

-- Trigger to update `updated_at` for Contact Table
CREATE TRIGGER `update_contact_timestamp`
BEFORE UPDATE ON `contact`
FOR EACH ROW
SET NEW.`updated_at` = CURRENT_TIMESTAMP;

-- Create Photos Table
CREATE TABLE `photos` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `photo_path` VARCHAR(350) NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL,
  `deleted_at` TIMESTAMP NULL
);

-- Trigger to update `updated_at` for Photos Table
CREATE TRIGGER `update_photos_timestamp`
BEFORE UPDATE ON `photos`
FOR EACH ROW
SET NEW.`updated_at` = CURRENT_TIMESTAMP;

-- Create Manage Group Table
CREATE TABLE `manage_group` (
  `group_id` BIGINT UNSIGNED NOT NULL,
  `id_card` VARCHAR(255) NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL,
  `deleted_at` TIMESTAMP NULL,
  CONSTRAINT `manage_group_ibfk_1` FOREIGN KEY (`group_id`) REFERENCES `group` (`group_id`) ON DELETE CASCADE,
  CONSTRAINT `manage_group_ibfk_2` FOREIGN KEY (`id_card`) REFERENCES `user` (`id_card`) ON DELETE CASCADE
);

-- Trigger to update `updated_at` for Manage Group Table
CREATE TRIGGER `update_manage_group_timestamp`
BEFORE UPDATE ON `manage_group`
FOR EACH ROW
SET NEW.`updated_at` = CURRENT_TIMESTAMP;

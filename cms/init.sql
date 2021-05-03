/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: components_page_heads
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `components_page_heads` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL,
  `description` longtext,
  `ogType` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 2 DEFAULT CHARSET = latin1;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: components_page_links
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `components_page_links` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `label` varchar(255) DEFAULT NULL,
  `href` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = latin1;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: components_page_localized_long_texts
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `components_page_localized_long_texts` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `language` int(11) DEFAULT NULL,
  `text` longtext,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = latin1;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: components_page_localized_rich_texts
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `components_page_localized_rich_texts` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `text` longtext,
  `language` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = latin1;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: components_page_localized_short_texts
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `components_page_localized_short_texts` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `text` varchar(255) DEFAULT NULL,
  `language` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = latin1;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: components_page_videos
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `components_page_videos` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `videoURI` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = latin1;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: core_store
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `core_store` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `key` varchar(255) DEFAULT NULL,
  `value` longtext,
  `type` varchar(255) DEFAULT NULL,
  `environment` varchar(255) DEFAULT NULL,
  `tag` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 37 DEFAULT CHARSET = latin1;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: index_pages
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `index_pages` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `created_by` int(11) DEFAULT NULL,
  `updated_by` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `language` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 2 DEFAULT CHARSET = latin1;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: index_pages_components
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `index_pages_components` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `field` varchar(255) NOT NULL,
  `order` int(10) unsigned NOT NULL,
  `component_type` varchar(255) NOT NULL,
  `component_id` int(11) NOT NULL,
  `index_page_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `index_page_id_fk` (`index_page_id`),
  CONSTRAINT `index_page_id_fk` FOREIGN KEY (`index_page_id`) REFERENCES `index_pages` (`id`) ON DELETE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 2 DEFAULT CHARSET = latin1;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: languages
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `languages` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `code` varchar(255) DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `updated_by` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 2 DEFAULT CHARSET = latin1;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: strapi_administrator
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `strapi_administrator` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `firstname` varchar(255) DEFAULT NULL,
  `lastname` varchar(255) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) DEFAULT NULL,
  `resetPasswordToken` varchar(255) DEFAULT NULL,
  `registrationToken` varchar(255) DEFAULT NULL,
  `isActive` tinyint(1) DEFAULT NULL,
  `blocked` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `strapi_administrator_email_unique` (`email`)
) ENGINE = InnoDB AUTO_INCREMENT = 2 DEFAULT CHARSET = latin1;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: strapi_permission
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `strapi_permission` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `action` varchar(255) NOT NULL,
  `subject` varchar(255) DEFAULT NULL,
  `fields` longtext,
  `conditions` longtext,
  `role` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 61 DEFAULT CHARSET = latin1;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: strapi_role
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `strapi_role` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `code` varchar(255) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `strapi_role_name_unique` (`name`),
  UNIQUE KEY `strapi_role_code_unique` (`code`)
) ENGINE = InnoDB AUTO_INCREMENT = 4 DEFAULT CHARSET = latin1;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: strapi_users_roles
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `strapi_users_roles` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `role_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 2 DEFAULT CHARSET = latin1;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: strapi_webhooks
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `strapi_webhooks` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `url` longtext,
  `headers` longtext,
  `events` longtext,
  `enabled` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = latin1;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: upload_file
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `upload_file` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `alternativeText` varchar(255) DEFAULT NULL,
  `caption` varchar(255) DEFAULT NULL,
  `width` int(11) DEFAULT NULL,
  `height` int(11) DEFAULT NULL,
  `formats` longtext,
  `hash` varchar(255) NOT NULL,
  `ext` varchar(255) DEFAULT NULL,
  `mime` varchar(255) NOT NULL,
  `size` decimal(10, 2) NOT NULL,
  `url` varchar(255) NOT NULL,
  `previewUrl` varchar(255) DEFAULT NULL,
  `provider` varchar(255) NOT NULL,
  `provider_metadata` longtext,
  `created_by` int(11) DEFAULT NULL,
  `updated_by` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = latin1;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: upload_file_morph
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `upload_file_morph` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `upload_file_id` int(11) DEFAULT NULL,
  `related_id` int(11) DEFAULT NULL,
  `related_type` longtext,
  `field` longtext,
  `order` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = latin1;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: users-permissions_permission
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `users-permissions_permission` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `type` varchar(255) NOT NULL,
  `controller` varchar(255) NOT NULL,
  `action` varchar(255) NOT NULL,
  `enabled` tinyint(1) NOT NULL,
  `policy` varchar(255) DEFAULT NULL,
  `role` int(11) DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `updated_by` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 185 DEFAULT CHARSET = latin1;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: users-permissions_role
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `users-permissions_role` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `updated_by` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users-permissions_role_type_unique` (`type`)
) ENGINE = InnoDB AUTO_INCREMENT = 3 DEFAULT CHARSET = latin1;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: users-permissions_user
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `users-permissions_user` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `provider` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `resetPasswordToken` varchar(255) DEFAULT NULL,
  `confirmationToken` varchar(255) DEFAULT NULL,
  `confirmed` tinyint(1) DEFAULT NULL,
  `blocked` tinyint(1) DEFAULT NULL,
  `role` int(11) DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `updated_by` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users-permissions_user_username_unique` (`username`)
) ENGINE = InnoDB DEFAULT CHARSET = latin1;

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: components_page_heads
# ------------------------------------------------------------

INSERT INTO
  `components_page_heads` (`id`, `title`, `description`, `ogType`)
VALUES
  (
    1,
    'en-us title ',
    'en-us site description',
    'website'
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: components_page_links
# ------------------------------------------------------------


# ------------------------------------------------------------
# DATA DUMP FOR TABLE: components_page_localized_long_texts
# ------------------------------------------------------------


# ------------------------------------------------------------
# DATA DUMP FOR TABLE: components_page_localized_rich_texts
# ------------------------------------------------------------


# ------------------------------------------------------------
# DATA DUMP FOR TABLE: components_page_localized_short_texts
# ------------------------------------------------------------


# ------------------------------------------------------------
# DATA DUMP FOR TABLE: components_page_videos
# ------------------------------------------------------------


# ------------------------------------------------------------
# DATA DUMP FOR TABLE: core_store
# ------------------------------------------------------------

INSERT INTO
  `core_store` (`id`, `key`, `value`, `type`, `environment`, `tag`)
VALUES
  (
    1,
    'model_def_strapi::core-store',
    '{\"uid\":\"strapi::core-store\",\"collectionName\":\"core_store\",\"info\":{\"name\":\"core_store\",\"description\":\"\"},\"options\":{\"timestamps\":false},\"attributes\":{\"key\":{\"type\":\"string\"},\"value\":{\"type\":\"text\"},\"type\":{\"type\":\"string\"},\"environment\":{\"type\":\"string\"},\"tag\":{\"type\":\"string\"}}}',
    'object',
    NULL,
    NULL
  );
INSERT INTO
  `core_store` (`id`, `key`, `value`, `type`, `environment`, `tag`)
VALUES
  (
    2,
    'model_def_strapi::webhooks',
    '{\"uid\":\"strapi::webhooks\",\"collectionName\":\"strapi_webhooks\",\"info\":{\"name\":\"Strapi webhooks\",\"description\":\"\"},\"options\":{\"timestamps\":false},\"attributes\":{\"name\":{\"type\":\"string\"},\"url\":{\"type\":\"text\"},\"headers\":{\"type\":\"json\"},\"events\":{\"type\":\"json\"},\"enabled\":{\"type\":\"boolean\"}}}',
    'object',
    NULL,
    NULL
  );
INSERT INTO
  `core_store` (`id`, `key`, `value`, `type`, `environment`, `tag`)
VALUES
  (
    3,
    'model_def_strapi::permission',
    '{\"uid\":\"strapi::permission\",\"collectionName\":\"strapi_permission\",\"kind\":\"collectionType\",\"info\":{\"name\":\"Permission\",\"description\":\"\"},\"options\":{\"timestamps\":[\"created_at\",\"updated_at\"]},\"attributes\":{\"action\":{\"type\":\"string\",\"minLength\":1,\"configurable\":false,\"required\":true},\"subject\":{\"type\":\"string\",\"minLength\":1,\"configurable\":false,\"required\":false},\"fields\":{\"type\":\"json\",\"configurable\":false,\"required\":false,\"default\":[]},\"conditions\":{\"type\":\"json\",\"configurable\":false,\"required\":false,\"default\":[]},\"role\":{\"configurable\":false,\"model\":\"role\",\"plugin\":\"admin\"}}}',
    'object',
    NULL,
    NULL
  );
INSERT INTO
  `core_store` (`id`, `key`, `value`, `type`, `environment`, `tag`)
VALUES
  (
    4,
    'model_def_strapi::role',
    '{\"uid\":\"strapi::role\",\"collectionName\":\"strapi_role\",\"kind\":\"collectionType\",\"info\":{\"name\":\"Role\",\"description\":\"\"},\"options\":{\"timestamps\":[\"created_at\",\"updated_at\"]},\"attributes\":{\"name\":{\"type\":\"string\",\"minLength\":1,\"unique\":true,\"configurable\":false,\"required\":true},\"code\":{\"type\":\"string\",\"minLength\":1,\"unique\":true,\"configurable\":false,\"required\":true},\"description\":{\"type\":\"string\",\"configurable\":false},\"users\":{\"configurable\":false,\"collection\":\"user\",\"via\":\"roles\",\"plugin\":\"admin\",\"attribute\":\"user\",\"column\":\"id\",\"isVirtual\":true},\"permissions\":{\"configurable\":false,\"plugin\":\"admin\",\"collection\":\"permission\",\"via\":\"role\",\"isVirtual\":true}}}',
    'object',
    NULL,
    NULL
  );
INSERT INTO
  `core_store` (`id`, `key`, `value`, `type`, `environment`, `tag`)
VALUES
  (
    5,
    'model_def_strapi::user',
    '{\"uid\":\"strapi::user\",\"collectionName\":\"strapi_administrator\",\"kind\":\"collectionType\",\"info\":{\"name\":\"User\",\"description\":\"\"},\"options\":{\"timestamps\":false},\"attributes\":{\"firstname\":{\"type\":\"string\",\"unique\":false,\"minLength\":1,\"configurable\":false,\"required\":false},\"lastname\":{\"type\":\"string\",\"unique\":false,\"minLength\":1,\"configurable\":false,\"required\":false},\"username\":{\"type\":\"string\",\"unique\":false,\"configurable\":false,\"required\":false},\"email\":{\"type\":\"email\",\"minLength\":6,\"configurable\":false,\"required\":true,\"unique\":true,\"private\":true},\"password\":{\"type\":\"password\",\"minLength\":6,\"configurable\":false,\"required\":false,\"private\":true},\"resetPasswordToken\":{\"type\":\"string\",\"configurable\":false,\"private\":true},\"registrationToken\":{\"type\":\"string\",\"configurable\":false,\"private\":true},\"isActive\":{\"type\":\"boolean\",\"default\":false,\"configurable\":false,\"private\":true},\"roles\":{\"collection\":\"role\",\"collectionName\":\"strapi_users_roles\",\"via\":\"users\",\"dominant\":true,\"plugin\":\"admin\",\"configurable\":false,\"private\":true,\"attribute\":\"role\",\"column\":\"id\",\"isVirtual\":true},\"blocked\":{\"type\":\"boolean\",\"default\":false,\"configurable\":false,\"private\":true}}}',
    'object',
    NULL,
    NULL
  );
INSERT INTO
  `core_store` (`id`, `key`, `value`, `type`, `environment`, `tag`)
VALUES
  (
    6,
    'model_def_plugins::upload.file',
    '{\"uid\":\"plugins::upload.file\",\"collectionName\":\"upload_file\",\"kind\":\"collectionType\",\"info\":{\"name\":\"file\",\"description\":\"\"},\"options\":{\"timestamps\":[\"created_at\",\"updated_at\"]},\"attributes\":{\"name\":{\"type\":\"string\",\"configurable\":false,\"required\":true},\"alternativeText\":{\"type\":\"string\",\"configurable\":false},\"caption\":{\"type\":\"string\",\"configurable\":false},\"width\":{\"type\":\"integer\",\"configurable\":false},\"height\":{\"type\":\"integer\",\"configurable\":false},\"formats\":{\"type\":\"json\",\"configurable\":false},\"hash\":{\"type\":\"string\",\"configurable\":false,\"required\":true},\"ext\":{\"type\":\"string\",\"configurable\":false},\"mime\":{\"type\":\"string\",\"configurable\":false,\"required\":true},\"size\":{\"type\":\"decimal\",\"configurable\":false,\"required\":true},\"url\":{\"type\":\"string\",\"configurable\":false,\"required\":true},\"previewUrl\":{\"type\":\"string\",\"configurable\":false},\"provider\":{\"type\":\"string\",\"configurable\":false,\"required\":true},\"provider_metadata\":{\"type\":\"json\",\"configurable\":false},\"related\":{\"collection\":\"*\",\"filter\":\"field\",\"configurable\":false},\"created_by\":{\"model\":\"user\",\"plugin\":\"admin\",\"configurable\":false,\"writable\":false,\"private\":true},\"updated_by\":{\"model\":\"user\",\"plugin\":\"admin\",\"configurable\":false,\"writable\":false,\"private\":true}}}',
    'object',
    NULL,
    NULL
  );
INSERT INTO
  `core_store` (`id`, `key`, `value`, `type`, `environment`, `tag`)
VALUES
  (
    7,
    'model_def_plugins::users-permissions.permission',
    '{\"uid\":\"plugins::users-permissions.permission\",\"collectionName\":\"users-permissions_permission\",\"kind\":\"collectionType\",\"info\":{\"name\":\"permission\",\"description\":\"\"},\"options\":{\"timestamps\":false},\"attributes\":{\"type\":{\"type\":\"string\",\"required\":true,\"configurable\":false},\"controller\":{\"type\":\"string\",\"required\":true,\"configurable\":false},\"action\":{\"type\":\"string\",\"required\":true,\"configurable\":false},\"enabled\":{\"type\":\"boolean\",\"required\":true,\"configurable\":false},\"policy\":{\"type\":\"string\",\"configurable\":false},\"role\":{\"model\":\"role\",\"via\":\"permissions\",\"plugin\":\"users-permissions\",\"configurable\":false},\"created_by\":{\"model\":\"user\",\"plugin\":\"admin\",\"configurable\":false,\"writable\":false,\"private\":true},\"updated_by\":{\"model\":\"user\",\"plugin\":\"admin\",\"configurable\":false,\"writable\":false,\"private\":true}}}',
    'object',
    NULL,
    NULL
  );
INSERT INTO
  `core_store` (`id`, `key`, `value`, `type`, `environment`, `tag`)
VALUES
  (
    8,
    'model_def_plugins::users-permissions.role',
    '{\"uid\":\"plugins::users-permissions.role\",\"collectionName\":\"users-permissions_role\",\"kind\":\"collectionType\",\"info\":{\"name\":\"role\",\"description\":\"\"},\"options\":{\"timestamps\":false},\"attributes\":{\"name\":{\"type\":\"string\",\"minLength\":3,\"required\":true,\"configurable\":false},\"description\":{\"type\":\"string\",\"configurable\":false},\"type\":{\"type\":\"string\",\"unique\":true,\"configurable\":false},\"permissions\":{\"collection\":\"permission\",\"via\":\"role\",\"plugin\":\"users-permissions\",\"configurable\":false,\"isVirtual\":true},\"users\":{\"collection\":\"user\",\"via\":\"role\",\"configurable\":false,\"plugin\":\"users-permissions\",\"isVirtual\":true},\"created_by\":{\"model\":\"user\",\"plugin\":\"admin\",\"configurable\":false,\"writable\":false,\"private\":true},\"updated_by\":{\"model\":\"user\",\"plugin\":\"admin\",\"configurable\":false,\"writable\":false,\"private\":true}}}',
    'object',
    NULL,
    NULL
  );
INSERT INTO
  `core_store` (`id`, `key`, `value`, `type`, `environment`, `tag`)
VALUES
  (
    9,
    'model_def_plugins::users-permissions.user',
    '{\"uid\":\"plugins::users-permissions.user\",\"collectionName\":\"users-permissions_user\",\"kind\":\"collectionType\",\"info\":{\"name\":\"user\",\"description\":\"\"},\"options\":{\"draftAndPublish\":false,\"timestamps\":[\"created_at\",\"updated_at\"]},\"attributes\":{\"username\":{\"type\":\"string\",\"minLength\":3,\"unique\":true,\"configurable\":false,\"required\":true},\"email\":{\"type\":\"email\",\"minLength\":6,\"configurable\":false,\"required\":true},\"provider\":{\"type\":\"string\",\"configurable\":false},\"password\":{\"type\":\"password\",\"minLength\":6,\"configurable\":false,\"private\":true},\"resetPasswordToken\":{\"type\":\"string\",\"configurable\":false,\"private\":true},\"confirmationToken\":{\"type\":\"string\",\"configurable\":false,\"private\":true},\"confirmed\":{\"type\":\"boolean\",\"default\":false,\"configurable\":false},\"blocked\":{\"type\":\"boolean\",\"default\":false,\"configurable\":false},\"role\":{\"model\":\"role\",\"via\":\"users\",\"plugin\":\"users-permissions\",\"configurable\":false},\"created_by\":{\"model\":\"user\",\"plugin\":\"admin\",\"configurable\":false,\"writable\":false,\"private\":true},\"updated_by\":{\"model\":\"user\",\"plugin\":\"admin\",\"configurable\":false,\"writable\":false,\"private\":true}}}',
    'object',
    NULL,
    NULL
  );
INSERT INTO
  `core_store` (`id`, `key`, `value`, `type`, `environment`, `tag`)
VALUES
  (
    10,
    'plugin_upload_settings',
    '{\"sizeOptimization\":true,\"responsiveDimensions\":true}',
    'object',
    'development',
    ''
  );
INSERT INTO
  `core_store` (`id`, `key`, `value`, `type`, `environment`, `tag`)
VALUES
  (
    11,
    'plugin_users-permissions_grant',
    '{\"email\":{\"enabled\":true,\"icon\":\"envelope\"},\"discord\":{\"enabled\":false,\"icon\":\"discord\",\"key\":\"\",\"secret\":\"\",\"callback\":\"/auth/discord/callback\",\"scope\":[\"identify\",\"email\"]},\"facebook\":{\"enabled\":false,\"icon\":\"facebook-square\",\"key\":\"\",\"secret\":\"\",\"callback\":\"/auth/facebook/callback\",\"scope\":[\"email\"]},\"google\":{\"enabled\":false,\"icon\":\"google\",\"key\":\"\",\"secret\":\"\",\"callback\":\"/auth/google/callback\",\"scope\":[\"email\"]},\"github\":{\"enabled\":false,\"icon\":\"github\",\"key\":\"\",\"secret\":\"\",\"callback\":\"/auth/github/callback\",\"scope\":[\"user\",\"user:email\"]},\"microsoft\":{\"enabled\":false,\"icon\":\"windows\",\"key\":\"\",\"secret\":\"\",\"callback\":\"/auth/microsoft/callback\",\"scope\":[\"user.read\"]},\"twitter\":{\"enabled\":false,\"icon\":\"twitter\",\"key\":\"\",\"secret\":\"\",\"callback\":\"/auth/twitter/callback\"},\"instagram\":{\"enabled\":false,\"icon\":\"instagram\",\"key\":\"\",\"secret\":\"\",\"callback\":\"/auth/instagram/callback\"},\"vk\":{\"enabled\":false,\"icon\":\"vk\",\"key\":\"\",\"secret\":\"\",\"callback\":\"/auth/vk/callback\",\"scope\":[\"email\"]},\"twitch\":{\"enabled\":false,\"icon\":\"twitch\",\"key\":\"\",\"secret\":\"\",\"callback\":\"/auth/twitch/callback\",\"scope\":[\"user:read:email\"]},\"linkedin\":{\"enabled\":false,\"icon\":\"linkedin\",\"key\":\"\",\"secret\":\"\",\"callback\":\"/auth/linkedin/callback\",\"scope\":[\"r_liteprofile\",\"r_emailaddress\"]},\"cognito\":{\"enabled\":false,\"icon\":\"aws\",\"key\":\"\",\"secret\":\"\",\"subdomain\":\"my.subdomain.com\",\"callback\":\"/auth/cognito/callback\",\"scope\":[\"email\",\"openid\",\"profile\"]}}',
    'object',
    '',
    ''
  );
INSERT INTO
  `core_store` (`id`, `key`, `value`, `type`, `environment`, `tag`)
VALUES
  (
    12,
    'plugin_content_manager_configuration_content_types::strapi::permission',
    '{\"uid\":\"strapi::permission\",\"settings\":{\"bulkable\":true,\"filterable\":true,\"searchable\":true,\"pageSize\":10,\"mainField\":\"action\",\"defaultSortBy\":\"action\",\"defaultSortOrder\":\"ASC\"},\"metadatas\":{\"id\":{\"edit\":{},\"list\":{\"label\":\"Id\",\"searchable\":true,\"sortable\":true}},\"action\":{\"edit\":{\"label\":\"Action\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"Action\",\"searchable\":true,\"sortable\":true}},\"subject\":{\"edit\":{\"label\":\"Subject\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"Subject\",\"searchable\":true,\"sortable\":true}},\"fields\":{\"edit\":{\"label\":\"Fields\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"Fields\",\"searchable\":false,\"sortable\":false}},\"conditions\":{\"edit\":{\"label\":\"Conditions\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"Conditions\",\"searchable\":false,\"sortable\":false}},\"role\":{\"edit\":{\"label\":\"Role\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true,\"mainField\":\"name\"},\"list\":{\"label\":\"Role\",\"searchable\":false,\"sortable\":false}},\"created_at\":{\"edit\":{\"label\":\"Created_at\",\"description\":\"\",\"placeholder\":\"\",\"visible\":false,\"editable\":true},\"list\":{\"label\":\"Created_at\",\"searchable\":true,\"sortable\":true}},\"updated_at\":{\"edit\":{\"label\":\"Updated_at\",\"description\":\"\",\"placeholder\":\"\",\"visible\":false,\"editable\":true},\"list\":{\"label\":\"Updated_at\",\"searchable\":true,\"sortable\":true}}},\"layouts\":{\"list\":[\"id\",\"action\",\"subject\",\"role\"],\"editRelations\":[\"role\"],\"edit\":[[{\"name\":\"action\",\"size\":6},{\"name\":\"subject\",\"size\":6}],[{\"name\":\"fields\",\"size\":12}],[{\"name\":\"conditions\",\"size\":12}]]}}',
    'object',
    '',
    ''
  );
INSERT INTO
  `core_store` (`id`, `key`, `value`, `type`, `environment`, `tag`)
VALUES
  (
    13,
    'plugin_content_manager_configuration_content_types::strapi::role',
    '{\"uid\":\"strapi::role\",\"settings\":{\"bulkable\":true,\"filterable\":true,\"searchable\":true,\"pageSize\":10,\"mainField\":\"name\",\"defaultSortBy\":\"name\",\"defaultSortOrder\":\"ASC\"},\"metadatas\":{\"id\":{\"edit\":{},\"list\":{\"label\":\"Id\",\"searchable\":true,\"sortable\":true}},\"name\":{\"edit\":{\"label\":\"Name\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"Name\",\"searchable\":true,\"sortable\":true}},\"code\":{\"edit\":{\"label\":\"Code\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"Code\",\"searchable\":true,\"sortable\":true}},\"description\":{\"edit\":{\"label\":\"Description\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"Description\",\"searchable\":true,\"sortable\":true}},\"users\":{\"edit\":{\"label\":\"Users\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true,\"mainField\":\"firstname\"},\"list\":{\"label\":\"Users\",\"searchable\":false,\"sortable\":false}},\"permissions\":{\"edit\":{\"label\":\"Permissions\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true,\"mainField\":\"action\"},\"list\":{\"label\":\"Permissions\",\"searchable\":false,\"sortable\":false}},\"created_at\":{\"edit\":{\"label\":\"Created_at\",\"description\":\"\",\"placeholder\":\"\",\"visible\":false,\"editable\":true},\"list\":{\"label\":\"Created_at\",\"searchable\":true,\"sortable\":true}},\"updated_at\":{\"edit\":{\"label\":\"Updated_at\",\"description\":\"\",\"placeholder\":\"\",\"visible\":false,\"editable\":true},\"list\":{\"label\":\"Updated_at\",\"searchable\":true,\"sortable\":true}}},\"layouts\":{\"list\":[\"id\",\"name\",\"code\",\"description\"],\"editRelations\":[\"users\",\"permissions\"],\"edit\":[[{\"name\":\"name\",\"size\":6},{\"name\":\"code\",\"size\":6}],[{\"name\":\"description\",\"size\":6}]]}}',
    'object',
    '',
    ''
  );
INSERT INTO
  `core_store` (`id`, `key`, `value`, `type`, `environment`, `tag`)
VALUES
  (
    14,
    'plugin_content_manager_configuration_content_types::strapi::user',
    '{\"uid\":\"strapi::user\",\"settings\":{\"bulkable\":true,\"filterable\":true,\"searchable\":true,\"pageSize\":10,\"mainField\":\"firstname\",\"defaultSortBy\":\"firstname\",\"defaultSortOrder\":\"ASC\"},\"metadatas\":{\"id\":{\"edit\":{},\"list\":{\"label\":\"Id\",\"searchable\":true,\"sortable\":true}},\"firstname\":{\"edit\":{\"label\":\"Firstname\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"Firstname\",\"searchable\":true,\"sortable\":true}},\"lastname\":{\"edit\":{\"label\":\"Lastname\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"Lastname\",\"searchable\":true,\"sortable\":true}},\"username\":{\"edit\":{\"label\":\"Username\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"Username\",\"searchable\":true,\"sortable\":true}},\"email\":{\"edit\":{\"label\":\"Email\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"Email\",\"searchable\":true,\"sortable\":true}},\"password\":{\"edit\":{\"label\":\"Password\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"Password\",\"searchable\":true,\"sortable\":true}},\"resetPasswordToken\":{\"edit\":{\"label\":\"ResetPasswordToken\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"ResetPasswordToken\",\"searchable\":true,\"sortable\":true}},\"registrationToken\":{\"edit\":{\"label\":\"RegistrationToken\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"RegistrationToken\",\"searchable\":true,\"sortable\":true}},\"isActive\":{\"edit\":{\"label\":\"IsActive\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"IsActive\",\"searchable\":true,\"sortable\":true}},\"roles\":{\"edit\":{\"label\":\"Roles\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true,\"mainField\":\"name\"},\"list\":{\"label\":\"Roles\",\"searchable\":false,\"sortable\":false}},\"blocked\":{\"edit\":{\"label\":\"Blocked\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"Blocked\",\"searchable\":true,\"sortable\":true}}},\"layouts\":{\"list\":[\"id\",\"firstname\",\"lastname\",\"username\"],\"editRelations\":[\"roles\"],\"edit\":[[{\"name\":\"firstname\",\"size\":6},{\"name\":\"lastname\",\"size\":6}],[{\"name\":\"username\",\"size\":6},{\"name\":\"email\",\"size\":6}],[{\"name\":\"password\",\"size\":6},{\"name\":\"resetPasswordToken\",\"size\":6}],[{\"name\":\"registrationToken\",\"size\":6},{\"name\":\"isActive\",\"size\":4}],[{\"name\":\"blocked\",\"size\":4}]]}}',
    'object',
    '',
    ''
  );
INSERT INTO
  `core_store` (`id`, `key`, `value`, `type`, `environment`, `tag`)
VALUES
  (
    15,
    'plugin_content_manager_configuration_content_types::plugins::upload.file',
    '{\"uid\":\"plugins::upload.file\",\"settings\":{\"bulkable\":true,\"filterable\":true,\"searchable\":true,\"pageSize\":10,\"mainField\":\"name\",\"defaultSortBy\":\"name\",\"defaultSortOrder\":\"ASC\"},\"metadatas\":{\"id\":{\"edit\":{},\"list\":{\"label\":\"Id\",\"searchable\":true,\"sortable\":true}},\"name\":{\"edit\":{\"label\":\"Name\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"Name\",\"searchable\":true,\"sortable\":true}},\"alternativeText\":{\"edit\":{\"label\":\"AlternativeText\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"AlternativeText\",\"searchable\":true,\"sortable\":true}},\"caption\":{\"edit\":{\"label\":\"Caption\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"Caption\",\"searchable\":true,\"sortable\":true}},\"width\":{\"edit\":{\"label\":\"Width\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"Width\",\"searchable\":true,\"sortable\":true}},\"height\":{\"edit\":{\"label\":\"Height\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"Height\",\"searchable\":true,\"sortable\":true}},\"formats\":{\"edit\":{\"label\":\"Formats\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"Formats\",\"searchable\":false,\"sortable\":false}},\"hash\":{\"edit\":{\"label\":\"Hash\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"Hash\",\"searchable\":true,\"sortable\":true}},\"ext\":{\"edit\":{\"label\":\"Ext\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"Ext\",\"searchable\":true,\"sortable\":true}},\"mime\":{\"edit\":{\"label\":\"Mime\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"Mime\",\"searchable\":true,\"sortable\":true}},\"size\":{\"edit\":{\"label\":\"Size\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"Size\",\"searchable\":true,\"sortable\":true}},\"url\":{\"edit\":{\"label\":\"Url\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"Url\",\"searchable\":true,\"sortable\":true}},\"previewUrl\":{\"edit\":{\"label\":\"PreviewUrl\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"PreviewUrl\",\"searchable\":true,\"sortable\":true}},\"provider\":{\"edit\":{\"label\":\"Provider\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"Provider\",\"searchable\":true,\"sortable\":true}},\"provider_metadata\":{\"edit\":{\"label\":\"Provider_metadata\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"Provider_metadata\",\"searchable\":false,\"sortable\":false}},\"related\":{\"edit\":{\"label\":\"Related\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"Related\",\"searchable\":false,\"sortable\":false}},\"created_at\":{\"edit\":{\"label\":\"Created_at\",\"description\":\"\",\"placeholder\":\"\",\"visible\":false,\"editable\":true},\"list\":{\"label\":\"Created_at\",\"searchable\":true,\"sortable\":true}},\"updated_at\":{\"edit\":{\"label\":\"Updated_at\",\"description\":\"\",\"placeholder\":\"\",\"visible\":false,\"editable\":true},\"list\":{\"label\":\"Updated_at\",\"searchable\":true,\"sortable\":true}}},\"layouts\":{\"list\":[\"id\",\"name\",\"alternativeText\",\"caption\"],\"editRelations\":[\"related\"],\"edit\":[[{\"name\":\"name\",\"size\":6},{\"name\":\"alternativeText\",\"size\":6}],[{\"name\":\"caption\",\"size\":6},{\"name\":\"width\",\"size\":4}],[{\"name\":\"height\",\"size\":4}],[{\"name\":\"formats\",\"size\":12}],[{\"name\":\"hash\",\"size\":6},{\"name\":\"ext\",\"size\":6}],[{\"name\":\"mime\",\"size\":6},{\"name\":\"size\",\"size\":4}],[{\"name\":\"url\",\"size\":6},{\"name\":\"previewUrl\",\"size\":6}],[{\"name\":\"provider\",\"size\":6}],[{\"name\":\"provider_metadata\",\"size\":12}]]}}',
    'object',
    '',
    ''
  );
INSERT INTO
  `core_store` (`id`, `key`, `value`, `type`, `environment`, `tag`)
VALUES
  (
    16,
    'plugin_content_manager_configuration_content_types::plugins::users-permissions.permission',
    '{\"uid\":\"plugins::users-permissions.permission\",\"settings\":{\"bulkable\":true,\"filterable\":true,\"searchable\":true,\"pageSize\":10,\"mainField\":\"type\",\"defaultSortBy\":\"type\",\"defaultSortOrder\":\"ASC\"},\"metadatas\":{\"id\":{\"edit\":{},\"list\":{\"label\":\"Id\",\"searchable\":true,\"sortable\":true}},\"type\":{\"edit\":{\"label\":\"Type\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"Type\",\"searchable\":true,\"sortable\":true}},\"controller\":{\"edit\":{\"label\":\"Controller\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"Controller\",\"searchable\":true,\"sortable\":true}},\"action\":{\"edit\":{\"label\":\"Action\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"Action\",\"searchable\":true,\"sortable\":true}},\"enabled\":{\"edit\":{\"label\":\"Enabled\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"Enabled\",\"searchable\":true,\"sortable\":true}},\"policy\":{\"edit\":{\"label\":\"Policy\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"Policy\",\"searchable\":true,\"sortable\":true}},\"role\":{\"edit\":{\"label\":\"Role\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true,\"mainField\":\"name\"},\"list\":{\"label\":\"Role\",\"searchable\":false,\"sortable\":false}}},\"layouts\":{\"list\":[\"id\",\"type\",\"controller\",\"action\"],\"editRelations\":[\"role\"],\"edit\":[[{\"name\":\"type\",\"size\":6},{\"name\":\"controller\",\"size\":6}],[{\"name\":\"action\",\"size\":6},{\"name\":\"enabled\",\"size\":4}],[{\"name\":\"policy\",\"size\":6}]]}}',
    'object',
    '',
    ''
  );
INSERT INTO
  `core_store` (`id`, `key`, `value`, `type`, `environment`, `tag`)
VALUES
  (
    17,
    'plugin_content_manager_configuration_content_types::plugins::users-permissions.role',
    '{\"uid\":\"plugins::users-permissions.role\",\"settings\":{\"bulkable\":true,\"filterable\":true,\"searchable\":true,\"pageSize\":10,\"mainField\":\"name\",\"defaultSortBy\":\"name\",\"defaultSortOrder\":\"ASC\"},\"metadatas\":{\"id\":{\"edit\":{},\"list\":{\"label\":\"Id\",\"searchable\":true,\"sortable\":true}},\"name\":{\"edit\":{\"label\":\"Name\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"Name\",\"searchable\":true,\"sortable\":true}},\"description\":{\"edit\":{\"label\":\"Description\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"Description\",\"searchable\":true,\"sortable\":true}},\"type\":{\"edit\":{\"label\":\"Type\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"Type\",\"searchable\":true,\"sortable\":true}},\"permissions\":{\"edit\":{\"label\":\"Permissions\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true,\"mainField\":\"type\"},\"list\":{\"label\":\"Permissions\",\"searchable\":false,\"sortable\":false}},\"users\":{\"edit\":{\"label\":\"Users\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true,\"mainField\":\"username\"},\"list\":{\"label\":\"Users\",\"searchable\":false,\"sortable\":false}}},\"layouts\":{\"list\":[\"id\",\"name\",\"description\",\"type\"],\"editRelations\":[\"permissions\",\"users\"],\"edit\":[[{\"name\":\"name\",\"size\":6},{\"name\":\"description\",\"size\":6}],[{\"name\":\"type\",\"size\":6}]]}}',
    'object',
    '',
    ''
  );
INSERT INTO
  `core_store` (`id`, `key`, `value`, `type`, `environment`, `tag`)
VALUES
  (
    18,
    'plugin_content_manager_configuration_content_types::plugins::users-permissions.user',
    '{\"uid\":\"plugins::users-permissions.user\",\"settings\":{\"bulkable\":true,\"filterable\":true,\"searchable\":true,\"pageSize\":10,\"mainField\":\"username\",\"defaultSortBy\":\"username\",\"defaultSortOrder\":\"ASC\"},\"metadatas\":{\"id\":{\"edit\":{},\"list\":{\"label\":\"Id\",\"searchable\":true,\"sortable\":true}},\"username\":{\"edit\":{\"label\":\"Username\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"Username\",\"searchable\":true,\"sortable\":true}},\"email\":{\"edit\":{\"label\":\"Email\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"Email\",\"searchable\":true,\"sortable\":true}},\"provider\":{\"edit\":{\"label\":\"Provider\",\"description\":\"\",\"placeholder\":\"\",\"visible\":false,\"editable\":true},\"list\":{\"label\":\"Provider\",\"searchable\":true,\"sortable\":true}},\"password\":{\"edit\":{\"label\":\"Password\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"Password\",\"searchable\":true,\"sortable\":true}},\"resetPasswordToken\":{\"edit\":{\"label\":\"ResetPasswordToken\",\"description\":\"\",\"placeholder\":\"\",\"visible\":false,\"editable\":true},\"list\":{\"label\":\"ResetPasswordToken\",\"searchable\":true,\"sortable\":true}},\"confirmationToken\":{\"edit\":{\"label\":\"ConfirmationToken\",\"description\":\"\",\"placeholder\":\"\",\"visible\":false,\"editable\":true},\"list\":{\"label\":\"ConfirmationToken\",\"searchable\":true,\"sortable\":true}},\"confirmed\":{\"edit\":{\"label\":\"Confirmed\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"Confirmed\",\"searchable\":true,\"sortable\":true}},\"blocked\":{\"edit\":{\"label\":\"Blocked\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"Blocked\",\"searchable\":true,\"sortable\":true}},\"role\":{\"edit\":{\"label\":\"Role\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true,\"mainField\":\"name\"},\"list\":{\"label\":\"Role\",\"searchable\":false,\"sortable\":false}},\"created_at\":{\"edit\":{\"label\":\"Created_at\",\"description\":\"\",\"placeholder\":\"\",\"visible\":false,\"editable\":true},\"list\":{\"label\":\"Created_at\",\"searchable\":true,\"sortable\":true}},\"updated_at\":{\"edit\":{\"label\":\"Updated_at\",\"description\":\"\",\"placeholder\":\"\",\"visible\":false,\"editable\":true},\"list\":{\"label\":\"Updated_at\",\"searchable\":true,\"sortable\":true}}},\"layouts\":{\"list\":[\"id\",\"username\",\"email\",\"confirmed\"],\"editRelations\":[\"role\"],\"edit\":[[{\"name\":\"username\",\"size\":6},{\"name\":\"email\",\"size\":6}],[{\"name\":\"password\",\"size\":6},{\"name\":\"confirmed\",\"size\":4}],[{\"name\":\"blocked\",\"size\":4}]]}}',
    'object',
    '',
    ''
  );
INSERT INTO
  `core_store` (`id`, `key`, `value`, `type`, `environment`, `tag`)
VALUES
  (
    19,
    'plugin_users-permissions_email',
    '{\"reset_password\":{\"display\":\"Email.template.reset_password\",\"icon\":\"sync\",\"options\":{\"from\":{\"name\":\"Administration Panel\",\"email\":\"no-reply@strapi.io\"},\"response_email\":\"\",\"object\":\"Reset password\",\"message\":\"<p>We heard that you lost your password. Sorry about that!</p>\\n\\n<p>But don’t worry! You can use the following link to reset your password:</p>\\n<p><%= URL %>?code=<%= TOKEN %></p>\\n\\n<p>Thanks.</p>\"}},\"email_confirmation\":{\"display\":\"Email.template.email_confirmation\",\"icon\":\"check-square\",\"options\":{\"from\":{\"name\":\"Administration Panel\",\"email\":\"no-reply@strapi.io\"},\"response_email\":\"\",\"object\":\"Account confirmation\",\"message\":\"<p>Thank you for registering!</p>\\n\\n<p>You have to confirm your email address. Please click on the link below.</p>\\n\\n<p><%= URL %>?confirmation=<%= CODE %></p>\\n\\n<p>Thanks.</p>\"}}}',
    'object',
    '',
    ''
  );
INSERT INTO
  `core_store` (`id`, `key`, `value`, `type`, `environment`, `tag`)
VALUES
  (
    20,
    'plugin_users-permissions_advanced',
    '{\"unique_email\":true,\"allow_register\":true,\"email_confirmation\":false,\"email_reset_password\":null,\"email_confirmation_redirection\":null,\"default_role\":\"authenticated\"}',
    'object',
    '',
    ''
  );
INSERT INTO
  `core_store` (`id`, `key`, `value`, `type`, `environment`, `tag`)
VALUES
  (
    21,
    'model_def_application::index-page.index-page',
    '{\"uid\":\"application::index-page.index-page\",\"collectionName\":\"index_pages\",\"kind\":\"collectionType\",\"info\":{\"name\":\"indexPage\",\"description\":\"\"},\"options\":{\"increments\":true,\"timestamps\":[\"created_at\",\"updated_at\"],\"draftAndPublish\":false},\"attributes\":{\"name\":{\"type\":\"string\",\"required\":true},\"head\":{\"type\":\"component\",\"repeatable\":false,\"component\":\"page.head\"},\"language\":{\"model\":\"language\"},\"created_by\":{\"model\":\"user\",\"plugin\":\"admin\",\"configurable\":false,\"writable\":false,\"private\":true},\"updated_by\":{\"model\":\"user\",\"plugin\":\"admin\",\"configurable\":false,\"writable\":false,\"private\":true}}}',
    'object',
    NULL,
    NULL
  );
INSERT INTO
  `core_store` (`id`, `key`, `value`, `type`, `environment`, `tag`)
VALUES
  (
    22,
    'plugin_content_manager_configuration_content_types::application::index-page.index-page',
    '{\"uid\":\"application::index-page.index-page\",\"settings\":{\"bulkable\":true,\"filterable\":true,\"searchable\":true,\"pageSize\":10,\"mainField\":\"name\",\"defaultSortBy\":\"name\",\"defaultSortOrder\":\"ASC\"},\"metadatas\":{\"id\":{\"edit\":{},\"list\":{\"label\":\"Id\",\"searchable\":true,\"sortable\":true}},\"name\":{\"edit\":{\"label\":\"Name\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"Name\",\"searchable\":true,\"sortable\":true}},\"head\":{\"edit\":{\"label\":\"Head\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"Head\",\"searchable\":false,\"sortable\":false}},\"language\":{\"edit\":{\"label\":\"Language\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true,\"mainField\":\"name\"},\"list\":{\"label\":\"Language\",\"searchable\":false,\"sortable\":false}},\"created_at\":{\"edit\":{\"label\":\"Created_at\",\"description\":\"\",\"placeholder\":\"\",\"visible\":false,\"editable\":true},\"list\":{\"label\":\"Created_at\",\"searchable\":true,\"sortable\":true}},\"updated_at\":{\"edit\":{\"label\":\"Updated_at\",\"description\":\"\",\"placeholder\":\"\",\"visible\":false,\"editable\":true},\"list\":{\"label\":\"Updated_at\",\"searchable\":true,\"sortable\":true}}},\"layouts\":{\"list\":[\"id\",\"name\",\"created_at\",\"updated_at\"],\"edit\":[[{\"name\":\"name\",\"size\":6}],[{\"name\":\"head\",\"size\":12}]],\"editRelations\":[\"language\"]}}',
    'object',
    '',
    ''
  );
INSERT INTO
  `core_store` (`id`, `key`, `value`, `type`, `environment`, `tag`)
VALUES
  (
    23,
    'model_def_page.head',
    '{\"uid\":\"page.head\",\"collectionName\":\"components_page_heads\",\"info\":{\"name\":\"head\",\"icon\":\"ad\"},\"options\":{\"timestamps\":false},\"attributes\":{\"title\":{\"type\":\"string\"},\"description\":{\"type\":\"text\"},\"ogType\":{\"type\":\"enumeration\",\"enum\":[\"website\"],\"default\":\"website\"},\"ogImage\":{\"model\":\"file\",\"via\":\"related\",\"allowedTypes\":[\"images\"],\"plugin\":\"upload\",\"required\":false}}}',
    'object',
    NULL,
    NULL
  );
INSERT INTO
  `core_store` (`id`, `key`, `value`, `type`, `environment`, `tag`)
VALUES
  (
    24,
    'plugin_content_manager_configuration_components::page.head',
    '{\"uid\":\"page.head\",\"settings\":{\"bulkable\":true,\"filterable\":true,\"searchable\":true,\"pageSize\":10,\"mainField\":\"title\",\"defaultSortBy\":\"title\",\"defaultSortOrder\":\"ASC\"},\"metadatas\":{\"id\":{\"edit\":{},\"list\":{\"label\":\"Id\",\"searchable\":false,\"sortable\":false}},\"title\":{\"edit\":{\"label\":\"Title\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"Title\",\"searchable\":true,\"sortable\":true}},\"description\":{\"edit\":{\"label\":\"Description\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"Description\",\"searchable\":true,\"sortable\":true}},\"ogType\":{\"edit\":{\"label\":\"OgType\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"OgType\",\"searchable\":true,\"sortable\":true}},\"ogImage\":{\"edit\":{\"label\":\"OgImage\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"OgImage\",\"searchable\":false,\"sortable\":false}}},\"layouts\":{\"list\":[\"id\",\"title\",\"description\",\"ogType\"],\"edit\":[[{\"name\":\"title\",\"size\":6},{\"name\":\"description\",\"size\":6}],[{\"name\":\"ogType\",\"size\":6},{\"name\":\"ogImage\",\"size\":6}]],\"editRelations\":[]},\"isComponent\":true}',
    'object',
    '',
    ''
  );
INSERT INTO
  `core_store` (`id`, `key`, `value`, `type`, `environment`, `tag`)
VALUES
  (
    25,
    'model_def_page.localized-short-text',
    '{\"uid\":\"page.localized-short-text\",\"collectionName\":\"components_page_localized_short_texts\",\"info\":{\"name\":\"localizedShortText\",\"icon\":\"align-left\",\"description\":\"\"},\"options\":{\"timestamps\":false},\"attributes\":{\"text\":{\"type\":\"string\"},\"language\":{\"model\":\"language\"}}}',
    'object',
    NULL,
    NULL
  );
INSERT INTO
  `core_store` (`id`, `key`, `value`, `type`, `environment`, `tag`)
VALUES
  (
    26,
    'plugin_content_manager_configuration_components::page.localized-short-text',
    '{\"uid\":\"page.localized-short-text\",\"settings\":{\"bulkable\":true,\"filterable\":true,\"searchable\":true,\"pageSize\":10,\"mainField\":\"text\",\"defaultSortBy\":\"text\",\"defaultSortOrder\":\"ASC\"},\"metadatas\":{\"id\":{\"edit\":{},\"list\":{\"label\":\"Id\",\"searchable\":false,\"sortable\":false}},\"text\":{\"edit\":{\"label\":\"Text\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"Text\",\"searchable\":true,\"sortable\":true}},\"language\":{\"edit\":{\"label\":\"Language\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true,\"mainField\":\"name\"},\"list\":{\"label\":\"Language\",\"searchable\":false,\"sortable\":false}}},\"layouts\":{\"list\":[\"id\",\"text\",\"language\"],\"edit\":[[{\"name\":\"text\",\"size\":6},{\"name\":\"language\",\"size\":6}]],\"editRelations\":[]},\"isComponent\":true}',
    'object',
    '',
    ''
  );
INSERT INTO
  `core_store` (`id`, `key`, `value`, `type`, `environment`, `tag`)
VALUES
  (
    27,
    'model_def_application::language.language',
    '{\"uid\":\"application::language.language\",\"collectionName\":\"languages\",\"kind\":\"collectionType\",\"info\":{\"name\":\"language\"},\"options\":{\"increments\":true,\"timestamps\":[\"created_at\",\"updated_at\"],\"draftAndPublish\":false},\"attributes\":{\"name\":{\"type\":\"string\"},\"code\":{\"type\":\"string\"},\"created_by\":{\"model\":\"user\",\"plugin\":\"admin\",\"configurable\":false,\"writable\":false,\"private\":true},\"updated_by\":{\"model\":\"user\",\"plugin\":\"admin\",\"configurable\":false,\"writable\":false,\"private\":true}}}',
    'object',
    NULL,
    NULL
  );
INSERT INTO
  `core_store` (`id`, `key`, `value`, `type`, `environment`, `tag`)
VALUES
  (
    28,
    'plugin_content_manager_configuration_content_types::application::language.language',
    '{\"uid\":\"application::language.language\",\"settings\":{\"bulkable\":true,\"filterable\":true,\"searchable\":true,\"pageSize\":10,\"mainField\":\"name\",\"defaultSortBy\":\"name\",\"defaultSortOrder\":\"ASC\"},\"metadatas\":{\"id\":{\"edit\":{},\"list\":{\"label\":\"Id\",\"searchable\":true,\"sortable\":true}},\"name\":{\"edit\":{\"label\":\"Name\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"Name\",\"searchable\":true,\"sortable\":true}},\"code\":{\"edit\":{\"label\":\"Code\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"Code\",\"searchable\":true,\"sortable\":true}},\"created_at\":{\"edit\":{\"label\":\"Created_at\",\"description\":\"\",\"placeholder\":\"\",\"visible\":false,\"editable\":true},\"list\":{\"label\":\"Created_at\",\"searchable\":true,\"sortable\":true}},\"updated_at\":{\"edit\":{\"label\":\"Updated_at\",\"description\":\"\",\"placeholder\":\"\",\"visible\":false,\"editable\":true},\"list\":{\"label\":\"Updated_at\",\"searchable\":true,\"sortable\":true}}},\"layouts\":{\"list\":[\"id\",\"name\",\"code\",\"created_at\"],\"editRelations\":[],\"edit\":[[{\"name\":\"name\",\"size\":6},{\"name\":\"code\",\"size\":6}]]}}',
    'object',
    '',
    ''
  );
INSERT INTO
  `core_store` (`id`, `key`, `value`, `type`, `environment`, `tag`)
VALUES
  (
    29,
    'model_def_page.localized-rich-text',
    '{\"uid\":\"page.localized-rich-text\",\"collectionName\":\"components_page_localized_rich_texts\",\"info\":{\"name\":\"localizedRichText\",\"icon\":\"align-justify\"},\"options\":{\"timestamps\":false},\"attributes\":{\"name\":{\"type\":\"string\"},\"text\":{\"type\":\"richtext\"},\"language\":{\"model\":\"language\"}}}',
    'object',
    NULL,
    NULL
  );
INSERT INTO
  `core_store` (`id`, `key`, `value`, `type`, `environment`, `tag`)
VALUES
  (
    30,
    'plugin_content_manager_configuration_components::page.localized-rich-text',
    '{\"uid\":\"page.localized-rich-text\",\"settings\":{\"bulkable\":true,\"filterable\":true,\"searchable\":true,\"pageSize\":10,\"mainField\":\"name\",\"defaultSortBy\":\"name\",\"defaultSortOrder\":\"ASC\"},\"metadatas\":{\"id\":{\"edit\":{},\"list\":{\"label\":\"Id\",\"searchable\":false,\"sortable\":false}},\"name\":{\"edit\":{\"label\":\"Name\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"Name\",\"searchable\":true,\"sortable\":true}},\"text\":{\"edit\":{\"label\":\"Text\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"Text\",\"searchable\":false,\"sortable\":false}},\"language\":{\"edit\":{\"label\":\"Language\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true,\"mainField\":\"name\"},\"list\":{\"label\":\"Language\",\"searchable\":false,\"sortable\":false}}},\"layouts\":{\"list\":[\"id\",\"name\",\"language\"],\"edit\":[[{\"name\":\"name\",\"size\":6}],[{\"name\":\"text\",\"size\":12}],[{\"name\":\"language\",\"size\":6}]],\"editRelations\":[]},\"isComponent\":true}',
    'object',
    '',
    ''
  );
INSERT INTO
  `core_store` (`id`, `key`, `value`, `type`, `environment`, `tag`)
VALUES
  (
    31,
    'model_def_page.localized-long-text',
    '{\"uid\":\"page.localized-long-text\",\"collectionName\":\"components_page_localized_long_texts\",\"info\":{\"name\":\"localizedLongText\",\"icon\":\"align-center\"},\"options\":{\"timestamps\":false},\"attributes\":{\"language\":{\"model\":\"language\"},\"text\":{\"type\":\"text\"}}}',
    'object',
    NULL,
    NULL
  );
INSERT INTO
  `core_store` (`id`, `key`, `value`, `type`, `environment`, `tag`)
VALUES
  (
    32,
    'plugin_content_manager_configuration_components::page.localized-long-text',
    '{\"uid\":\"page.localized-long-text\",\"settings\":{\"bulkable\":true,\"filterable\":true,\"searchable\":true,\"pageSize\":10,\"mainField\":\"id\",\"defaultSortBy\":\"id\",\"defaultSortOrder\":\"ASC\"},\"metadatas\":{\"id\":{\"edit\":{},\"list\":{\"label\":\"Id\",\"searchable\":false,\"sortable\":false}},\"language\":{\"edit\":{\"label\":\"Language\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true,\"mainField\":\"name\"},\"list\":{\"label\":\"Language\",\"searchable\":false,\"sortable\":false}},\"text\":{\"edit\":{\"label\":\"Text\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"Text\",\"searchable\":true,\"sortable\":true}}},\"layouts\":{\"list\":[\"id\",\"language\",\"text\"],\"edit\":[[{\"name\":\"language\",\"size\":6},{\"name\":\"text\",\"size\":6}]],\"editRelations\":[]},\"isComponent\":true}',
    'object',
    '',
    ''
  );
INSERT INTO
  `core_store` (`id`, `key`, `value`, `type`, `environment`, `tag`)
VALUES
  (
    33,
    'model_def_page.video',
    '{\"uid\":\"page.video\",\"collectionName\":\"components_page_videos\",\"info\":{\"name\":\"video\",\"icon\":\"angle-double-right\"},\"options\":{\"timestamps\":false},\"attributes\":{\"videoURI\":{\"type\":\"string\"},\"videoSrc\":{\"model\":\"file\",\"via\":\"related\",\"allowedTypes\":[\"images\"],\"plugin\":\"upload\",\"required\":false}}}',
    'object',
    NULL,
    NULL
  );
INSERT INTO
  `core_store` (`id`, `key`, `value`, `type`, `environment`, `tag`)
VALUES
  (
    34,
    'plugin_content_manager_configuration_components::page.video',
    '{\"uid\":\"page.video\",\"settings\":{\"bulkable\":true,\"filterable\":true,\"searchable\":true,\"pageSize\":10,\"mainField\":\"videoURI\",\"defaultSortBy\":\"videoURI\",\"defaultSortOrder\":\"ASC\"},\"metadatas\":{\"id\":{\"edit\":{},\"list\":{\"label\":\"Id\",\"searchable\":false,\"sortable\":false}},\"videoURI\":{\"edit\":{\"label\":\"VideoURI\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"VideoURI\",\"searchable\":true,\"sortable\":true}},\"videoSrc\":{\"edit\":{\"label\":\"VideoSrc\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"VideoSrc\",\"searchable\":false,\"sortable\":false}}},\"layouts\":{\"list\":[\"id\",\"videoURI\",\"videoSrc\"],\"edit\":[[{\"name\":\"videoURI\",\"size\":6},{\"name\":\"videoSrc\",\"size\":6}]],\"editRelations\":[]},\"isComponent\":true}',
    'object',
    '',
    ''
  );
INSERT INTO
  `core_store` (`id`, `key`, `value`, `type`, `environment`, `tag`)
VALUES
  (
    35,
    'model_def_page.link',
    '{\"uid\":\"page.link\",\"collectionName\":\"components_page_links\",\"info\":{\"name\":\"link\",\"icon\":\"align-right\"},\"options\":{\"timestamps\":false},\"attributes\":{\"label\":{\"type\":\"string\"},\"href\":{\"type\":\"string\"}}}',
    'object',
    NULL,
    NULL
  );
INSERT INTO
  `core_store` (`id`, `key`, `value`, `type`, `environment`, `tag`)
VALUES
  (
    36,
    'plugin_content_manager_configuration_components::page.link',
    '{\"uid\":\"page.link\",\"settings\":{\"bulkable\":true,\"filterable\":true,\"searchable\":true,\"pageSize\":10,\"mainField\":\"label\",\"defaultSortBy\":\"label\",\"defaultSortOrder\":\"ASC\"},\"metadatas\":{\"id\":{\"edit\":{},\"list\":{\"label\":\"Id\",\"searchable\":true,\"sortable\":true}},\"label\":{\"edit\":{\"label\":\"Label\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"Label\",\"searchable\":true,\"sortable\":true}},\"href\":{\"edit\":{\"label\":\"Href\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"Href\",\"searchable\":true,\"sortable\":true}}},\"layouts\":{\"list\":[\"id\",\"label\",\"href\"],\"editRelations\":[],\"edit\":[[{\"name\":\"label\",\"size\":6},{\"name\":\"href\",\"size\":6}]]},\"isComponent\":true}',
    'object',
    '',
    ''
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: index_pages
# ------------------------------------------------------------

INSERT INTO
  `index_pages` (
    `id`,
    `name`,
    `created_by`,
    `updated_by`,
    `created_at`,
    `updated_at`,
    `language`
  )
VALUES
  (
    1,
    'indexPage (en-us)',
    1,
    1,
    '2021-04-25 18:27:40',
    '2021-04-25 18:27:40',
    1
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: index_pages_components
# ------------------------------------------------------------

INSERT INTO
  `index_pages_components` (
    `id`,
    `field`,
    `order`,
    `component_type`,
    `component_id`,
    `index_page_id`
  )
VALUES
  (1, 'head', 1, 'components_page_heads', 1, 1);

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: languages
# ------------------------------------------------------------

INSERT INTO
  `languages` (
    `id`,
    `name`,
    `code`,
    `created_by`,
    `updated_by`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    1,
    'English (United States)',
    'en-us',
    1,
    1,
    '2021-04-25 18:26:52',
    '2021-04-25 18:26:52'
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: strapi_administrator
# ------------------------------------------------------------

INSERT INTO
  `strapi_administrator` (
    `id`,
    `firstname`,
    `lastname`,
    `username`,
    `email`,
    `password`,
    `resetPasswordToken`,
    `registrationToken`,
    `isActive`,
    `blocked`
  )
VALUES
  (
    1,
    'Root',
    'Root',
    'root',
    'root@root.com',
    '$2b$10$KSYUrdabYBcoeEDEeeWjs.2LIpjb0AKuWvR/SnwRc1aydTIkXWPTm',
    NULL,
    NULL,
    1,
    NULL
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: strapi_permission
# ------------------------------------------------------------

INSERT INTO
  `strapi_permission` (
    `id`,
    `action`,
    `subject`,
    `fields`,
    `conditions`,
    `role`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    1,
    'plugins::upload.read',
    NULL,
    NULL,
    '[]',
    2,
    '2021-04-25 18:05:13',
    '2021-04-25 18:05:13'
  );
INSERT INTO
  `strapi_permission` (
    `id`,
    `action`,
    `subject`,
    `fields`,
    `conditions`,
    `role`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    2,
    'plugins::upload.assets.create',
    NULL,
    NULL,
    '[]',
    2,
    '2021-04-25 18:05:13',
    '2021-04-25 18:05:13'
  );
INSERT INTO
  `strapi_permission` (
    `id`,
    `action`,
    `subject`,
    `fields`,
    `conditions`,
    `role`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    3,
    'plugins::upload.assets.update',
    NULL,
    NULL,
    '[]',
    2,
    '2021-04-25 18:05:13',
    '2021-04-25 18:05:13'
  );
INSERT INTO
  `strapi_permission` (
    `id`,
    `action`,
    `subject`,
    `fields`,
    `conditions`,
    `role`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    4,
    'plugins::upload.assets.download',
    NULL,
    NULL,
    '[]',
    2,
    '2021-04-25 18:05:13',
    '2021-04-25 18:05:13'
  );
INSERT INTO
  `strapi_permission` (
    `id`,
    `action`,
    `subject`,
    `fields`,
    `conditions`,
    `role`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    5,
    'plugins::upload.assets.copy-link',
    NULL,
    NULL,
    '[]',
    2,
    '2021-04-25 18:05:13',
    '2021-04-25 18:05:13'
  );
INSERT INTO
  `strapi_permission` (
    `id`,
    `action`,
    `subject`,
    `fields`,
    `conditions`,
    `role`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    6,
    'plugins::upload.read',
    NULL,
    NULL,
    '[\"admin::is-creator\"]',
    3,
    '2021-04-25 18:05:14',
    '2021-04-25 18:05:14'
  );
INSERT INTO
  `strapi_permission` (
    `id`,
    `action`,
    `subject`,
    `fields`,
    `conditions`,
    `role`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    7,
    'plugins::upload.assets.create',
    NULL,
    NULL,
    '[]',
    3,
    '2021-04-25 18:05:14',
    '2021-04-25 18:05:14'
  );
INSERT INTO
  `strapi_permission` (
    `id`,
    `action`,
    `subject`,
    `fields`,
    `conditions`,
    `role`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    8,
    'plugins::upload.assets.update',
    NULL,
    NULL,
    '[\"admin::is-creator\"]',
    3,
    '2021-04-25 18:05:14',
    '2021-04-25 18:05:14'
  );
INSERT INTO
  `strapi_permission` (
    `id`,
    `action`,
    `subject`,
    `fields`,
    `conditions`,
    `role`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    9,
    'plugins::upload.assets.download',
    NULL,
    NULL,
    '[]',
    3,
    '2021-04-25 18:05:14',
    '2021-04-25 18:05:14'
  );
INSERT INTO
  `strapi_permission` (
    `id`,
    `action`,
    `subject`,
    `fields`,
    `conditions`,
    `role`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    10,
    'plugins::upload.assets.copy-link',
    NULL,
    NULL,
    '[]',
    3,
    '2021-04-25 18:05:14',
    '2021-04-25 18:05:14'
  );
INSERT INTO
  `strapi_permission` (
    `id`,
    `action`,
    `subject`,
    `fields`,
    `conditions`,
    `role`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    11,
    'plugins::content-manager.explorer.create',
    'plugins::users-permissions.user',
    '[\"username\",\"email\",\"provider\",\"password\",\"resetPasswordToken\",\"confirmationToken\",\"confirmed\",\"blocked\",\"role\"]',
    '[]',
    1,
    '2021-04-25 18:05:14',
    '2021-04-25 18:05:14'
  );
INSERT INTO
  `strapi_permission` (
    `id`,
    `action`,
    `subject`,
    `fields`,
    `conditions`,
    `role`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    12,
    'plugins::content-manager.explorer.read',
    'plugins::users-permissions.user',
    '[\"username\",\"email\",\"provider\",\"password\",\"resetPasswordToken\",\"confirmationToken\",\"confirmed\",\"blocked\",\"role\"]',
    '[]',
    1,
    '2021-04-25 18:05:14',
    '2021-04-25 18:05:14'
  );
INSERT INTO
  `strapi_permission` (
    `id`,
    `action`,
    `subject`,
    `fields`,
    `conditions`,
    `role`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    13,
    'plugins::content-manager.explorer.update',
    'plugins::users-permissions.user',
    '[\"username\",\"email\",\"provider\",\"password\",\"resetPasswordToken\",\"confirmationToken\",\"confirmed\",\"blocked\",\"role\"]',
    '[]',
    1,
    '2021-04-25 18:05:14',
    '2021-04-25 18:05:14'
  );
INSERT INTO
  `strapi_permission` (
    `id`,
    `action`,
    `subject`,
    `fields`,
    `conditions`,
    `role`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    14,
    'plugins::content-manager.explorer.delete',
    'plugins::users-permissions.user',
    NULL,
    '[]',
    1,
    '2021-04-25 18:05:14',
    '2021-04-25 18:05:14'
  );
INSERT INTO
  `strapi_permission` (
    `id`,
    `action`,
    `subject`,
    `fields`,
    `conditions`,
    `role`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    15,
    'plugins::content-type-builder.read',
    NULL,
    NULL,
    '[]',
    1,
    '2021-04-25 18:05:14',
    '2021-04-25 18:05:14'
  );
INSERT INTO
  `strapi_permission` (
    `id`,
    `action`,
    `subject`,
    `fields`,
    `conditions`,
    `role`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    16,
    'plugins::upload.read',
    NULL,
    NULL,
    '[]',
    1,
    '2021-04-25 18:05:14',
    '2021-04-25 18:05:14'
  );
INSERT INTO
  `strapi_permission` (
    `id`,
    `action`,
    `subject`,
    `fields`,
    `conditions`,
    `role`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    17,
    'plugins::upload.assets.create',
    NULL,
    NULL,
    '[]',
    1,
    '2021-04-25 18:05:14',
    '2021-04-25 18:05:14'
  );
INSERT INTO
  `strapi_permission` (
    `id`,
    `action`,
    `subject`,
    `fields`,
    `conditions`,
    `role`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    18,
    'plugins::upload.assets.update',
    NULL,
    NULL,
    '[]',
    1,
    '2021-04-25 18:05:14',
    '2021-04-25 18:05:14'
  );
INSERT INTO
  `strapi_permission` (
    `id`,
    `action`,
    `subject`,
    `fields`,
    `conditions`,
    `role`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    19,
    'plugins::upload.assets.download',
    NULL,
    NULL,
    '[]',
    1,
    '2021-04-25 18:05:14',
    '2021-04-25 18:05:14'
  );
INSERT INTO
  `strapi_permission` (
    `id`,
    `action`,
    `subject`,
    `fields`,
    `conditions`,
    `role`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    20,
    'plugins::upload.assets.copy-link',
    NULL,
    NULL,
    '[]',
    1,
    '2021-04-25 18:05:14',
    '2021-04-25 18:05:14'
  );
INSERT INTO
  `strapi_permission` (
    `id`,
    `action`,
    `subject`,
    `fields`,
    `conditions`,
    `role`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    21,
    'plugins::upload.settings.read',
    NULL,
    NULL,
    '[]',
    1,
    '2021-04-25 18:05:14',
    '2021-04-25 18:05:14'
  );
INSERT INTO
  `strapi_permission` (
    `id`,
    `action`,
    `subject`,
    `fields`,
    `conditions`,
    `role`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    22,
    'plugins::content-manager.single-types.configure-view',
    NULL,
    NULL,
    '[]',
    1,
    '2021-04-25 18:05:14',
    '2021-04-25 18:05:14'
  );
INSERT INTO
  `strapi_permission` (
    `id`,
    `action`,
    `subject`,
    `fields`,
    `conditions`,
    `role`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    23,
    'plugins::content-manager.collection-types.configure-view',
    NULL,
    NULL,
    '[]',
    1,
    '2021-04-25 18:05:14',
    '2021-04-25 18:05:14'
  );
INSERT INTO
  `strapi_permission` (
    `id`,
    `action`,
    `subject`,
    `fields`,
    `conditions`,
    `role`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    24,
    'plugins::content-manager.components.configure-layout',
    NULL,
    NULL,
    '[]',
    1,
    '2021-04-25 18:05:14',
    '2021-04-25 18:05:14'
  );
INSERT INTO
  `strapi_permission` (
    `id`,
    `action`,
    `subject`,
    `fields`,
    `conditions`,
    `role`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    25,
    'plugins::users-permissions.roles.create',
    NULL,
    NULL,
    '[]',
    1,
    '2021-04-25 18:05:14',
    '2021-04-25 18:05:14'
  );
INSERT INTO
  `strapi_permission` (
    `id`,
    `action`,
    `subject`,
    `fields`,
    `conditions`,
    `role`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    26,
    'plugins::users-permissions.roles.read',
    NULL,
    NULL,
    '[]',
    1,
    '2021-04-25 18:05:14',
    '2021-04-25 18:05:14'
  );
INSERT INTO
  `strapi_permission` (
    `id`,
    `action`,
    `subject`,
    `fields`,
    `conditions`,
    `role`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    27,
    'plugins::users-permissions.roles.update',
    NULL,
    NULL,
    '[]',
    1,
    '2021-04-25 18:05:14',
    '2021-04-25 18:05:14'
  );
INSERT INTO
  `strapi_permission` (
    `id`,
    `action`,
    `subject`,
    `fields`,
    `conditions`,
    `role`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    28,
    'plugins::users-permissions.roles.delete',
    NULL,
    NULL,
    '[]',
    1,
    '2021-04-25 18:05:14',
    '2021-04-25 18:05:14'
  );
INSERT INTO
  `strapi_permission` (
    `id`,
    `action`,
    `subject`,
    `fields`,
    `conditions`,
    `role`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    29,
    'plugins::users-permissions.providers.read',
    NULL,
    NULL,
    '[]',
    1,
    '2021-04-25 18:05:14',
    '2021-04-25 18:05:14'
  );
INSERT INTO
  `strapi_permission` (
    `id`,
    `action`,
    `subject`,
    `fields`,
    `conditions`,
    `role`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    30,
    'plugins::users-permissions.providers.update',
    NULL,
    NULL,
    '[]',
    1,
    '2021-04-25 18:05:14',
    '2021-04-25 18:05:14'
  );
INSERT INTO
  `strapi_permission` (
    `id`,
    `action`,
    `subject`,
    `fields`,
    `conditions`,
    `role`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    31,
    'plugins::users-permissions.email-templates.read',
    NULL,
    NULL,
    '[]',
    1,
    '2021-04-25 18:05:14',
    '2021-04-25 18:05:14'
  );
INSERT INTO
  `strapi_permission` (
    `id`,
    `action`,
    `subject`,
    `fields`,
    `conditions`,
    `role`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    32,
    'plugins::users-permissions.email-templates.update',
    NULL,
    NULL,
    '[]',
    1,
    '2021-04-25 18:05:14',
    '2021-04-25 18:05:14'
  );
INSERT INTO
  `strapi_permission` (
    `id`,
    `action`,
    `subject`,
    `fields`,
    `conditions`,
    `role`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    33,
    'plugins::users-permissions.advanced-settings.read',
    NULL,
    NULL,
    '[]',
    1,
    '2021-04-25 18:05:14',
    '2021-04-25 18:05:14'
  );
INSERT INTO
  `strapi_permission` (
    `id`,
    `action`,
    `subject`,
    `fields`,
    `conditions`,
    `role`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    34,
    'plugins::users-permissions.advanced-settings.update',
    NULL,
    NULL,
    '[]',
    1,
    '2021-04-25 18:05:14',
    '2021-04-25 18:05:14'
  );
INSERT INTO
  `strapi_permission` (
    `id`,
    `action`,
    `subject`,
    `fields`,
    `conditions`,
    `role`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    35,
    'admin::marketplace.read',
    NULL,
    NULL,
    '[]',
    1,
    '2021-04-25 18:05:14',
    '2021-04-25 18:05:14'
  );
INSERT INTO
  `strapi_permission` (
    `id`,
    `action`,
    `subject`,
    `fields`,
    `conditions`,
    `role`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    36,
    'admin::marketplace.plugins.install',
    NULL,
    NULL,
    '[]',
    1,
    '2021-04-25 18:05:14',
    '2021-04-25 18:05:14'
  );
INSERT INTO
  `strapi_permission` (
    `id`,
    `action`,
    `subject`,
    `fields`,
    `conditions`,
    `role`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    37,
    'admin::marketplace.plugins.uninstall',
    NULL,
    NULL,
    '[]',
    1,
    '2021-04-25 18:05:14',
    '2021-04-25 18:05:14'
  );
INSERT INTO
  `strapi_permission` (
    `id`,
    `action`,
    `subject`,
    `fields`,
    `conditions`,
    `role`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    38,
    'admin::webhooks.create',
    NULL,
    NULL,
    '[]',
    1,
    '2021-04-25 18:05:14',
    '2021-04-25 18:05:14'
  );
INSERT INTO
  `strapi_permission` (
    `id`,
    `action`,
    `subject`,
    `fields`,
    `conditions`,
    `role`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    39,
    'admin::webhooks.read',
    NULL,
    NULL,
    '[]',
    1,
    '2021-04-25 18:05:14',
    '2021-04-25 18:05:14'
  );
INSERT INTO
  `strapi_permission` (
    `id`,
    `action`,
    `subject`,
    `fields`,
    `conditions`,
    `role`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    40,
    'admin::webhooks.update',
    NULL,
    NULL,
    '[]',
    1,
    '2021-04-25 18:05:14',
    '2021-04-25 18:05:14'
  );
INSERT INTO
  `strapi_permission` (
    `id`,
    `action`,
    `subject`,
    `fields`,
    `conditions`,
    `role`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    41,
    'admin::webhooks.delete',
    NULL,
    NULL,
    '[]',
    1,
    '2021-04-25 18:05:15',
    '2021-04-25 18:05:15'
  );
INSERT INTO
  `strapi_permission` (
    `id`,
    `action`,
    `subject`,
    `fields`,
    `conditions`,
    `role`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    42,
    'admin::users.create',
    NULL,
    NULL,
    '[]',
    1,
    '2021-04-25 18:05:15',
    '2021-04-25 18:05:15'
  );
INSERT INTO
  `strapi_permission` (
    `id`,
    `action`,
    `subject`,
    `fields`,
    `conditions`,
    `role`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    43,
    'admin::users.read',
    NULL,
    NULL,
    '[]',
    1,
    '2021-04-25 18:05:15',
    '2021-04-25 18:05:15'
  );
INSERT INTO
  `strapi_permission` (
    `id`,
    `action`,
    `subject`,
    `fields`,
    `conditions`,
    `role`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    44,
    'admin::users.update',
    NULL,
    NULL,
    '[]',
    1,
    '2021-04-25 18:05:15',
    '2021-04-25 18:05:15'
  );
INSERT INTO
  `strapi_permission` (
    `id`,
    `action`,
    `subject`,
    `fields`,
    `conditions`,
    `role`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    45,
    'admin::users.delete',
    NULL,
    NULL,
    '[]',
    1,
    '2021-04-25 18:05:15',
    '2021-04-25 18:05:15'
  );
INSERT INTO
  `strapi_permission` (
    `id`,
    `action`,
    `subject`,
    `fields`,
    `conditions`,
    `role`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    46,
    'admin::roles.create',
    NULL,
    NULL,
    '[]',
    1,
    '2021-04-25 18:05:15',
    '2021-04-25 18:05:15'
  );
INSERT INTO
  `strapi_permission` (
    `id`,
    `action`,
    `subject`,
    `fields`,
    `conditions`,
    `role`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    47,
    'admin::roles.read',
    NULL,
    NULL,
    '[]',
    1,
    '2021-04-25 18:05:15',
    '2021-04-25 18:05:15'
  );
INSERT INTO
  `strapi_permission` (
    `id`,
    `action`,
    `subject`,
    `fields`,
    `conditions`,
    `role`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    48,
    'admin::roles.update',
    NULL,
    NULL,
    '[]',
    1,
    '2021-04-25 18:05:15',
    '2021-04-25 18:05:15'
  );
INSERT INTO
  `strapi_permission` (
    `id`,
    `action`,
    `subject`,
    `fields`,
    `conditions`,
    `role`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    49,
    'admin::roles.delete',
    NULL,
    NULL,
    '[]',
    1,
    '2021-04-25 18:05:15',
    '2021-04-25 18:05:15'
  );
INSERT INTO
  `strapi_permission` (
    `id`,
    `action`,
    `subject`,
    `fields`,
    `conditions`,
    `role`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    52,
    'plugins::content-manager.explorer.delete',
    'application::index-page.index-page',
    NULL,
    '[]',
    1,
    '2021-04-25 18:14:38',
    '2021-04-25 18:14:38'
  );
INSERT INTO
  `strapi_permission` (
    `id`,
    `action`,
    `subject`,
    `fields`,
    `conditions`,
    `role`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    54,
    'plugins::content-manager.explorer.create',
    'application::language.language',
    '[\"name\",\"code\"]',
    '[]',
    1,
    '2021-04-25 18:21:02',
    '2021-04-25 18:21:02'
  );
INSERT INTO
  `strapi_permission` (
    `id`,
    `action`,
    `subject`,
    `fields`,
    `conditions`,
    `role`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    55,
    'plugins::content-manager.explorer.read',
    'application::language.language',
    '[\"name\",\"code\"]',
    '[]',
    1,
    '2021-04-25 18:21:02',
    '2021-04-25 18:21:02'
  );
INSERT INTO
  `strapi_permission` (
    `id`,
    `action`,
    `subject`,
    `fields`,
    `conditions`,
    `role`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    56,
    'plugins::content-manager.explorer.update',
    'application::language.language',
    '[\"name\",\"code\"]',
    '[]',
    1,
    '2021-04-25 18:21:02',
    '2021-04-25 18:21:02'
  );
INSERT INTO
  `strapi_permission` (
    `id`,
    `action`,
    `subject`,
    `fields`,
    `conditions`,
    `role`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    57,
    'plugins::content-manager.explorer.delete',
    'application::language.language',
    NULL,
    '[]',
    1,
    '2021-04-25 18:21:02',
    '2021-04-25 18:21:02'
  );
INSERT INTO
  `strapi_permission` (
    `id`,
    `action`,
    `subject`,
    `fields`,
    `conditions`,
    `role`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    58,
    'plugins::content-manager.explorer.create',
    'application::index-page.index-page',
    '[\"name\",\"head.title\",\"head.description\",\"head.ogType\",\"head.ogImage\",\"language\"]',
    '[]',
    1,
    '2021-04-25 18:22:01',
    '2021-04-25 18:22:01'
  );
INSERT INTO
  `strapi_permission` (
    `id`,
    `action`,
    `subject`,
    `fields`,
    `conditions`,
    `role`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    59,
    'plugins::content-manager.explorer.read',
    'application::index-page.index-page',
    '[\"name\",\"head.title\",\"head.description\",\"head.ogType\",\"head.ogImage\",\"language\"]',
    '[]',
    1,
    '2021-04-25 18:22:01',
    '2021-04-25 18:22:01'
  );
INSERT INTO
  `strapi_permission` (
    `id`,
    `action`,
    `subject`,
    `fields`,
    `conditions`,
    `role`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    60,
    'plugins::content-manager.explorer.update',
    'application::index-page.index-page',
    '[\"name\",\"head.title\",\"head.description\",\"head.ogType\",\"head.ogImage\",\"language\"]',
    '[]',
    1,
    '2021-04-25 18:22:01',
    '2021-04-25 18:22:01'
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: strapi_role
# ------------------------------------------------------------

INSERT INTO
  `strapi_role` (
    `id`,
    `name`,
    `code`,
    `description`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    1,
    'Super Admin',
    'strapi-super-admin',
    'Super Admins can access and manage all features and settings.',
    '2021-04-25 18:05:13',
    '2021-04-25 18:05:13'
  );
INSERT INTO
  `strapi_role` (
    `id`,
    `name`,
    `code`,
    `description`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    2,
    'Editor',
    'strapi-editor',
    'Editors can manage and publish contents including those of other users.',
    '2021-04-25 18:05:13',
    '2021-04-25 18:05:13'
  );
INSERT INTO
  `strapi_role` (
    `id`,
    `name`,
    `code`,
    `description`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    3,
    'Author',
    'strapi-author',
    'Authors can manage the content they have created.',
    '2021-04-25 18:05:13',
    '2021-04-25 18:05:13'
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: strapi_users_roles
# ------------------------------------------------------------

INSERT INTO
  `strapi_users_roles` (`id`, `user_id`, `role_id`)
VALUES
  (1, 1, 1);

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: strapi_webhooks
# ------------------------------------------------------------


# ------------------------------------------------------------
# DATA DUMP FOR TABLE: upload_file
# ------------------------------------------------------------


# ------------------------------------------------------------
# DATA DUMP FOR TABLE: upload_file_morph
# ------------------------------------------------------------


# ------------------------------------------------------------
# DATA DUMP FOR TABLE: users-permissions_permission
# ------------------------------------------------------------

INSERT INTO
  `users-permissions_permission` (
    `id`,
    `type`,
    `controller`,
    `action`,
    `enabled`,
    `policy`,
    `role`,
    `created_by`,
    `updated_by`
  )
VALUES
  (
    1,
    'content-manager',
    'collection-types',
    'bulkdelete',
    0,
    '',
    1,
    NULL,
    NULL
  );
INSERT INTO
  `users-permissions_permission` (
    `id`,
    `type`,
    `controller`,
    `action`,
    `enabled`,
    `policy`,
    `role`,
    `created_by`,
    `updated_by`
  )
VALUES
  (
    2,
    'content-manager',
    'collection-types',
    'bulkdelete',
    0,
    '',
    2,
    NULL,
    NULL
  );
INSERT INTO
  `users-permissions_permission` (
    `id`,
    `type`,
    `controller`,
    `action`,
    `enabled`,
    `policy`,
    `role`,
    `created_by`,
    `updated_by`
  )
VALUES
  (
    3,
    'content-manager',
    'collection-types',
    'create',
    0,
    '',
    1,
    NULL,
    NULL
  );
INSERT INTO
  `users-permissions_permission` (
    `id`,
    `type`,
    `controller`,
    `action`,
    `enabled`,
    `policy`,
    `role`,
    `created_by`,
    `updated_by`
  )
VALUES
  (
    4,
    'content-manager',
    'collection-types',
    'create',
    0,
    '',
    2,
    NULL,
    NULL
  );
INSERT INTO
  `users-permissions_permission` (
    `id`,
    `type`,
    `controller`,
    `action`,
    `enabled`,
    `policy`,
    `role`,
    `created_by`,
    `updated_by`
  )
VALUES
  (
    5,
    'content-manager',
    'collection-types',
    'find',
    0,
    '',
    1,
    NULL,
    NULL
  );
INSERT INTO
  `users-permissions_permission` (
    `id`,
    `type`,
    `controller`,
    `action`,
    `enabled`,
    `policy`,
    `role`,
    `created_by`,
    `updated_by`
  )
VALUES
  (
    6,
    'content-manager',
    'collection-types',
    'delete',
    0,
    '',
    2,
    NULL,
    NULL
  );
INSERT INTO
  `users-permissions_permission` (
    `id`,
    `type`,
    `controller`,
    `action`,
    `enabled`,
    `policy`,
    `role`,
    `created_by`,
    `updated_by`
  )
VALUES
  (
    7,
    'content-manager',
    'collection-types',
    'delete',
    0,
    '',
    1,
    NULL,
    NULL
  );
INSERT INTO
  `users-permissions_permission` (
    `id`,
    `type`,
    `controller`,
    `action`,
    `enabled`,
    `policy`,
    `role`,
    `created_by`,
    `updated_by`
  )
VALUES
  (
    8,
    'content-manager',
    'collection-types',
    'findone',
    0,
    '',
    1,
    NULL,
    NULL
  );
INSERT INTO
  `users-permissions_permission` (
    `id`,
    `type`,
    `controller`,
    `action`,
    `enabled`,
    `policy`,
    `role`,
    `created_by`,
    `updated_by`
  )
VALUES
  (
    9,
    'content-manager',
    'collection-types',
    'find',
    0,
    '',
    2,
    NULL,
    NULL
  );
INSERT INTO
  `users-permissions_permission` (
    `id`,
    `type`,
    `controller`,
    `action`,
    `enabled`,
    `policy`,
    `role`,
    `created_by`,
    `updated_by`
  )
VALUES
  (
    10,
    'content-manager',
    'collection-types',
    'findone',
    0,
    '',
    2,
    NULL,
    NULL
  );
INSERT INTO
  `users-permissions_permission` (
    `id`,
    `type`,
    `controller`,
    `action`,
    `enabled`,
    `policy`,
    `role`,
    `created_by`,
    `updated_by`
  )
VALUES
  (
    11,
    'content-manager',
    'collection-types',
    'previewmanyrelations',
    0,
    '',
    1,
    NULL,
    NULL
  );
INSERT INTO
  `users-permissions_permission` (
    `id`,
    `type`,
    `controller`,
    `action`,
    `enabled`,
    `policy`,
    `role`,
    `created_by`,
    `updated_by`
  )
VALUES
  (
    12,
    'content-manager',
    'collection-types',
    'previewmanyrelations',
    0,
    '',
    2,
    NULL,
    NULL
  );
INSERT INTO
  `users-permissions_permission` (
    `id`,
    `type`,
    `controller`,
    `action`,
    `enabled`,
    `policy`,
    `role`,
    `created_by`,
    `updated_by`
  )
VALUES
  (
    13,
    'content-manager',
    'collection-types',
    'publish',
    0,
    '',
    1,
    NULL,
    NULL
  );
INSERT INTO
  `users-permissions_permission` (
    `id`,
    `type`,
    `controller`,
    `action`,
    `enabled`,
    `policy`,
    `role`,
    `created_by`,
    `updated_by`
  )
VALUES
  (
    14,
    'content-manager',
    'collection-types',
    'publish',
    0,
    '',
    2,
    NULL,
    NULL
  );
INSERT INTO
  `users-permissions_permission` (
    `id`,
    `type`,
    `controller`,
    `action`,
    `enabled`,
    `policy`,
    `role`,
    `created_by`,
    `updated_by`
  )
VALUES
  (
    15,
    'content-manager',
    'collection-types',
    'unpublish',
    0,
    '',
    1,
    NULL,
    NULL
  );
INSERT INTO
  `users-permissions_permission` (
    `id`,
    `type`,
    `controller`,
    `action`,
    `enabled`,
    `policy`,
    `role`,
    `created_by`,
    `updated_by`
  )
VALUES
  (
    16,
    'content-manager',
    'collection-types',
    'unpublish',
    0,
    '',
    2,
    NULL,
    NULL
  );
INSERT INTO
  `users-permissions_permission` (
    `id`,
    `type`,
    `controller`,
    `action`,
    `enabled`,
    `policy`,
    `role`,
    `created_by`,
    `updated_by`
  )
VALUES
  (
    17,
    'content-manager',
    'collection-types',
    'update',
    0,
    '',
    1,
    NULL,
    NULL
  );
INSERT INTO
  `users-permissions_permission` (
    `id`,
    `type`,
    `controller`,
    `action`,
    `enabled`,
    `policy`,
    `role`,
    `created_by`,
    `updated_by`
  )
VALUES
  (
    18,
    'content-manager',
    'collection-types',
    'update',
    0,
    '',
    2,
    NULL,
    NULL
  );
INSERT INTO
  `users-permissions_permission` (
    `id`,
    `type`,
    `controller`,
    `action`,
    `enabled`,
    `policy`,
    `role`,
    `created_by`,
    `updated_by`
  )
VALUES
  (
    19,
    'content-manager',
    'components',
    'findcomponentconfiguration',
    0,
    '',
    1,
    NULL,
    NULL
  );
INSERT INTO
  `users-permissions_permission` (
    `id`,
    `type`,
    `controller`,
    `action`,
    `enabled`,
    `policy`,
    `role`,
    `created_by`,
    `updated_by`
  )
VALUES
  (
    20,
    'content-manager',
    'components',
    'findcomponentconfiguration',
    0,
    '',
    2,
    NULL,
    NULL
  );
INSERT INTO
  `users-permissions_permission` (
    `id`,
    `type`,
    `controller`,
    `action`,
    `enabled`,
    `policy`,
    `role`,
    `created_by`,
    `updated_by`
  )
VALUES
  (
    21,
    'content-manager',
    'components',
    'findcomponents',
    0,
    '',
    1,
    NULL,
    NULL
  );
INSERT INTO
  `users-permissions_permission` (
    `id`,
    `type`,
    `controller`,
    `action`,
    `enabled`,
    `policy`,
    `role`,
    `created_by`,
    `updated_by`
  )
VALUES
  (
    22,
    'content-manager',
    'components',
    'findcomponents',
    0,
    '',
    2,
    NULL,
    NULL
  );
INSERT INTO
  `users-permissions_permission` (
    `id`,
    `type`,
    `controller`,
    `action`,
    `enabled`,
    `policy`,
    `role`,
    `created_by`,
    `updated_by`
  )
VALUES
  (
    23,
    'content-manager',
    'components',
    'updatecomponentconfiguration',
    0,
    '',
    1,
    NULL,
    NULL
  );
INSERT INTO
  `users-permissions_permission` (
    `id`,
    `type`,
    `controller`,
    `action`,
    `enabled`,
    `policy`,
    `role`,
    `created_by`,
    `updated_by`
  )
VALUES
  (
    24,
    'content-manager',
    'components',
    'updatecomponentconfiguration',
    0,
    '',
    2,
    NULL,
    NULL
  );
INSERT INTO
  `users-permissions_permission` (
    `id`,
    `type`,
    `controller`,
    `action`,
    `enabled`,
    `policy`,
    `role`,
    `created_by`,
    `updated_by`
  )
VALUES
  (
    25,
    'content-manager',
    'content-types',
    'findcontenttypeconfiguration',
    0,
    '',
    1,
    NULL,
    NULL
  );
INSERT INTO
  `users-permissions_permission` (
    `id`,
    `type`,
    `controller`,
    `action`,
    `enabled`,
    `policy`,
    `role`,
    `created_by`,
    `updated_by`
  )
VALUES
  (
    26,
    'content-manager',
    'content-types',
    'findcontenttypeconfiguration',
    0,
    '',
    2,
    NULL,
    NULL
  );
INSERT INTO
  `users-permissions_permission` (
    `id`,
    `type`,
    `controller`,
    `action`,
    `enabled`,
    `policy`,
    `role`,
    `created_by`,
    `updated_by`
  )
VALUES
  (
    27,
    'content-manager',
    'content-types',
    'findcontenttypes',
    0,
    '',
    1,
    NULL,
    NULL
  );
INSERT INTO
  `users-permissions_permission` (
    `id`,
    `type`,
    `controller`,
    `action`,
    `enabled`,
    `policy`,
    `role`,
    `created_by`,
    `updated_by`
  )
VALUES
  (
    28,
    'content-manager',
    'content-types',
    'findcontenttypes',
    0,
    '',
    2,
    NULL,
    NULL
  );
INSERT INTO
  `users-permissions_permission` (
    `id`,
    `type`,
    `controller`,
    `action`,
    `enabled`,
    `policy`,
    `role`,
    `created_by`,
    `updated_by`
  )
VALUES
  (
    29,
    'content-manager',
    'content-types',
    'updatecontenttypeconfiguration',
    0,
    '',
    1,
    NULL,
    NULL
  );
INSERT INTO
  `users-permissions_permission` (
    `id`,
    `type`,
    `controller`,
    `action`,
    `enabled`,
    `policy`,
    `role`,
    `created_by`,
    `updated_by`
  )
VALUES
  (
    30,
    'content-manager',
    'content-types',
    'updatecontenttypeconfiguration',
    0,
    '',
    2,
    NULL,
    NULL
  );
INSERT INTO
  `users-permissions_permission` (
    `id`,
    `type`,
    `controller`,
    `action`,
    `enabled`,
    `policy`,
    `role`,
    `created_by`,
    `updated_by`
  )
VALUES
  (
    31,
    'content-manager',
    'relations',
    'find',
    0,
    '',
    1,
    NULL,
    NULL
  );
INSERT INTO
  `users-permissions_permission` (
    `id`,
    `type`,
    `controller`,
    `action`,
    `enabled`,
    `policy`,
    `role`,
    `created_by`,
    `updated_by`
  )
VALUES
  (
    32,
    'content-manager',
    'relations',
    'find',
    0,
    '',
    2,
    NULL,
    NULL
  );
INSERT INTO
  `users-permissions_permission` (
    `id`,
    `type`,
    `controller`,
    `action`,
    `enabled`,
    `policy`,
    `role`,
    `created_by`,
    `updated_by`
  )
VALUES
  (
    33,
    'content-manager',
    'single-types',
    'createorupdate',
    0,
    '',
    1,
    NULL,
    NULL
  );
INSERT INTO
  `users-permissions_permission` (
    `id`,
    `type`,
    `controller`,
    `action`,
    `enabled`,
    `policy`,
    `role`,
    `created_by`,
    `updated_by`
  )
VALUES
  (
    34,
    'content-manager',
    'single-types',
    'createorupdate',
    0,
    '',
    2,
    NULL,
    NULL
  );
INSERT INTO
  `users-permissions_permission` (
    `id`,
    `type`,
    `controller`,
    `action`,
    `enabled`,
    `policy`,
    `role`,
    `created_by`,
    `updated_by`
  )
VALUES
  (
    35,
    'content-manager',
    'single-types',
    'delete',
    0,
    '',
    1,
    NULL,
    NULL
  );
INSERT INTO
  `users-permissions_permission` (
    `id`,
    `type`,
    `controller`,
    `action`,
    `enabled`,
    `policy`,
    `role`,
    `created_by`,
    `updated_by`
  )
VALUES
  (
    36,
    'content-manager',
    'single-types',
    'delete',
    0,
    '',
    2,
    NULL,
    NULL
  );
INSERT INTO
  `users-permissions_permission` (
    `id`,
    `type`,
    `controller`,
    `action`,
    `enabled`,
    `policy`,
    `role`,
    `created_by`,
    `updated_by`
  )
VALUES
  (
    37,
    'content-manager',
    'single-types',
    'find',
    0,
    '',
    1,
    NULL,
    NULL
  );
INSERT INTO
  `users-permissions_permission` (
    `id`,
    `type`,
    `controller`,
    `action`,
    `enabled`,
    `policy`,
    `role`,
    `created_by`,
    `updated_by`
  )
VALUES
  (
    38,
    'content-manager',
    'single-types',
    'find',
    0,
    '',
    2,
    NULL,
    NULL
  );
INSERT INTO
  `users-permissions_permission` (
    `id`,
    `type`,
    `controller`,
    `action`,
    `enabled`,
    `policy`,
    `role`,
    `created_by`,
    `updated_by`
  )
VALUES
  (
    39,
    'content-manager',
    'single-types',
    'publish',
    0,
    '',
    1,
    NULL,
    NULL
  );
INSERT INTO
  `users-permissions_permission` (
    `id`,
    `type`,
    `controller`,
    `action`,
    `enabled`,
    `policy`,
    `role`,
    `created_by`,
    `updated_by`
  )
VALUES
  (
    40,
    'content-manager',
    'single-types',
    'publish',
    0,
    '',
    2,
    NULL,
    NULL
  );
INSERT INTO
  `users-permissions_permission` (
    `id`,
    `type`,
    `controller`,
    `action`,
    `enabled`,
    `policy`,
    `role`,
    `created_by`,
    `updated_by`
  )
VALUES
  (
    41,
    'content-manager',
    'single-types',
    'unpublish',
    0,
    '',
    1,
    NULL,
    NULL
  );
INSERT INTO
  `users-permissions_permission` (
    `id`,
    `type`,
    `controller`,
    `action`,
    `enabled`,
    `policy`,
    `role`,
    `created_by`,
    `updated_by`
  )
VALUES
  (
    42,
    'content-manager',
    'single-types',
    'unpublish',
    0,
    '',
    2,
    NULL,
    NULL
  );
INSERT INTO
  `users-permissions_permission` (
    `id`,
    `type`,
    `controller`,
    `action`,
    `enabled`,
    `policy`,
    `role`,
    `created_by`,
    `updated_by`
  )
VALUES
  (
    43,
    'content-manager',
    'uid',
    'checkuidavailability',
    0,
    '',
    1,
    NULL,
    NULL
  );
INSERT INTO
  `users-permissions_permission` (
    `id`,
    `type`,
    `controller`,
    `action`,
    `enabled`,
    `policy`,
    `role`,
    `created_by`,
    `updated_by`
  )
VALUES
  (
    44,
    'content-manager',
    'uid',
    'checkuidavailability',
    0,
    '',
    2,
    NULL,
    NULL
  );
INSERT INTO
  `users-permissions_permission` (
    `id`,
    `type`,
    `controller`,
    `action`,
    `enabled`,
    `policy`,
    `role`,
    `created_by`,
    `updated_by`
  )
VALUES
  (
    45,
    'content-manager',
    'uid',
    'generateuid',
    0,
    '',
    1,
    NULL,
    NULL
  );
INSERT INTO
  `users-permissions_permission` (
    `id`,
    `type`,
    `controller`,
    `action`,
    `enabled`,
    `policy`,
    `role`,
    `created_by`,
    `updated_by`
  )
VALUES
  (
    46,
    'content-manager',
    'uid',
    'generateuid',
    0,
    '',
    2,
    NULL,
    NULL
  );
INSERT INTO
  `users-permissions_permission` (
    `id`,
    `type`,
    `controller`,
    `action`,
    `enabled`,
    `policy`,
    `role`,
    `created_by`,
    `updated_by`
  )
VALUES
  (
    47,
    'content-type-builder',
    'builder',
    'getreservednames',
    0,
    '',
    1,
    NULL,
    NULL
  );
INSERT INTO
  `users-permissions_permission` (
    `id`,
    `type`,
    `controller`,
    `action`,
    `enabled`,
    `policy`,
    `role`,
    `created_by`,
    `updated_by`
  )
VALUES
  (
    48,
    'content-type-builder',
    'builder',
    'getreservednames',
    0,
    '',
    2,
    NULL,
    NULL
  );
INSERT INTO
  `users-permissions_permission` (
    `id`,
    `type`,
    `controller`,
    `action`,
    `enabled`,
    `policy`,
    `role`,
    `created_by`,
    `updated_by`
  )
VALUES
  (
    49,
    'content-type-builder',
    'componentcategories',
    'deletecategory',
    0,
    '',
    1,
    NULL,
    NULL
  );
INSERT INTO
  `users-permissions_permission` (
    `id`,
    `type`,
    `controller`,
    `action`,
    `enabled`,
    `policy`,
    `role`,
    `created_by`,
    `updated_by`
  )
VALUES
  (
    50,
    'content-type-builder',
    'componentcategories',
    'deletecategory',
    0,
    '',
    2,
    NULL,
    NULL
  );
INSERT INTO
  `users-permissions_permission` (
    `id`,
    `type`,
    `controller`,
    `action`,
    `enabled`,
    `policy`,
    `role`,
    `created_by`,
    `updated_by`
  )
VALUES
  (
    51,
    'content-type-builder',
    'componentcategories',
    'editcategory',
    0,
    '',
    1,
    NULL,
    NULL
  );
INSERT INTO
  `users-permissions_permission` (
    `id`,
    `type`,
    `controller`,
    `action`,
    `enabled`,
    `policy`,
    `role`,
    `created_by`,
    `updated_by`
  )
VALUES
  (
    52,
    'content-type-builder',
    'componentcategories',
    'editcategory',
    0,
    '',
    2,
    NULL,
    NULL
  );
INSERT INTO
  `users-permissions_permission` (
    `id`,
    `type`,
    `controller`,
    `action`,
    `enabled`,
    `policy`,
    `role`,
    `created_by`,
    `updated_by`
  )
VALUES
  (
    53,
    'content-type-builder',
    'components',
    'createcomponent',
    0,
    '',
    1,
    NULL,
    NULL
  );
INSERT INTO
  `users-permissions_permission` (
    `id`,
    `type`,
    `controller`,
    `action`,
    `enabled`,
    `policy`,
    `role`,
    `created_by`,
    `updated_by`
  )
VALUES
  (
    54,
    'content-type-builder',
    'components',
    'createcomponent',
    0,
    '',
    2,
    NULL,
    NULL
  );
INSERT INTO
  `users-permissions_permission` (
    `id`,
    `type`,
    `controller`,
    `action`,
    `enabled`,
    `policy`,
    `role`,
    `created_by`,
    `updated_by`
  )
VALUES
  (
    55,
    'content-type-builder',
    'components',
    'deletecomponent',
    0,
    '',
    1,
    NULL,
    NULL
  );
INSERT INTO
  `users-permissions_permission` (
    `id`,
    `type`,
    `controller`,
    `action`,
    `enabled`,
    `policy`,
    `role`,
    `created_by`,
    `updated_by`
  )
VALUES
  (
    56,
    'content-type-builder',
    'components',
    'deletecomponent',
    0,
    '',
    2,
    NULL,
    NULL
  );
INSERT INTO
  `users-permissions_permission` (
    `id`,
    `type`,
    `controller`,
    `action`,
    `enabled`,
    `policy`,
    `role`,
    `created_by`,
    `updated_by`
  )
VALUES
  (
    57,
    'content-type-builder',
    'components',
    'getcomponent',
    0,
    '',
    1,
    NULL,
    NULL
  );
INSERT INTO
  `users-permissions_permission` (
    `id`,
    `type`,
    `controller`,
    `action`,
    `enabled`,
    `policy`,
    `role`,
    `created_by`,
    `updated_by`
  )
VALUES
  (
    58,
    'content-type-builder',
    'components',
    'getcomponent',
    0,
    '',
    2,
    NULL,
    NULL
  );
INSERT INTO
  `users-permissions_permission` (
    `id`,
    `type`,
    `controller`,
    `action`,
    `enabled`,
    `policy`,
    `role`,
    `created_by`,
    `updated_by`
  )
VALUES
  (
    59,
    'content-type-builder',
    'components',
    'getcomponents',
    0,
    '',
    1,
    NULL,
    NULL
  );
INSERT INTO
  `users-permissions_permission` (
    `id`,
    `type`,
    `controller`,
    `action`,
    `enabled`,
    `policy`,
    `role`,
    `created_by`,
    `updated_by`
  )
VALUES
  (
    60,
    'content-type-builder',
    'components',
    'getcomponents',
    0,
    '',
    2,
    NULL,
    NULL
  );
INSERT INTO
  `users-permissions_permission` (
    `id`,
    `type`,
    `controller`,
    `action`,
    `enabled`,
    `policy`,
    `role`,
    `created_by`,
    `updated_by`
  )
VALUES
  (
    61,
    'content-type-builder',
    'components',
    'updatecomponent',
    0,
    '',
    1,
    NULL,
    NULL
  );
INSERT INTO
  `users-permissions_permission` (
    `id`,
    `type`,
    `controller`,
    `action`,
    `enabled`,
    `policy`,
    `role`,
    `created_by`,
    `updated_by`
  )
VALUES
  (
    62,
    'content-type-builder',
    'components',
    'updatecomponent',
    0,
    '',
    2,
    NULL,
    NULL
  );
INSERT INTO
  `users-permissions_permission` (
    `id`,
    `type`,
    `controller`,
    `action`,
    `enabled`,
    `policy`,
    `role`,
    `created_by`,
    `updated_by`
  )
VALUES
  (
    63,
    'content-type-builder',
    'connections',
    'getconnections',
    0,
    '',
    1,
    NULL,
    NULL
  );
INSERT INTO
  `users-permissions_permission` (
    `id`,
    `type`,
    `controller`,
    `action`,
    `enabled`,
    `policy`,
    `role`,
    `created_by`,
    `updated_by`
  )
VALUES
  (
    64,
    'content-type-builder',
    'connections',
    'getconnections',
    0,
    '',
    2,
    NULL,
    NULL
  );
INSERT INTO
  `users-permissions_permission` (
    `id`,
    `type`,
    `controller`,
    `action`,
    `enabled`,
    `policy`,
    `role`,
    `created_by`,
    `updated_by`
  )
VALUES
  (
    65,
    'content-type-builder',
    'contenttypes',
    'createcontenttype',
    0,
    '',
    1,
    NULL,
    NULL
  );
INSERT INTO
  `users-permissions_permission` (
    `id`,
    `type`,
    `controller`,
    `action`,
    `enabled`,
    `policy`,
    `role`,
    `created_by`,
    `updated_by`
  )
VALUES
  (
    66,
    'content-type-builder',
    'contenttypes',
    'createcontenttype',
    0,
    '',
    2,
    NULL,
    NULL
  );
INSERT INTO
  `users-permissions_permission` (
    `id`,
    `type`,
    `controller`,
    `action`,
    `enabled`,
    `policy`,
    `role`,
    `created_by`,
    `updated_by`
  )
VALUES
  (
    67,
    'content-type-builder',
    'contenttypes',
    'deletecontenttype',
    0,
    '',
    1,
    NULL,
    NULL
  );
INSERT INTO
  `users-permissions_permission` (
    `id`,
    `type`,
    `controller`,
    `action`,
    `enabled`,
    `policy`,
    `role`,
    `created_by`,
    `updated_by`
  )
VALUES
  (
    68,
    'content-type-builder',
    'contenttypes',
    'deletecontenttype',
    0,
    '',
    2,
    NULL,
    NULL
  );
INSERT INTO
  `users-permissions_permission` (
    `id`,
    `type`,
    `controller`,
    `action`,
    `enabled`,
    `policy`,
    `role`,
    `created_by`,
    `updated_by`
  )
VALUES
  (
    69,
    'content-type-builder',
    'contenttypes',
    'getcontenttype',
    0,
    '',
    1,
    NULL,
    NULL
  );
INSERT INTO
  `users-permissions_permission` (
    `id`,
    `type`,
    `controller`,
    `action`,
    `enabled`,
    `policy`,
    `role`,
    `created_by`,
    `updated_by`
  )
VALUES
  (
    70,
    'content-type-builder',
    'contenttypes',
    'getcontenttype',
    0,
    '',
    2,
    NULL,
    NULL
  );
INSERT INTO
  `users-permissions_permission` (
    `id`,
    `type`,
    `controller`,
    `action`,
    `enabled`,
    `policy`,
    `role`,
    `created_by`,
    `updated_by`
  )
VALUES
  (
    71,
    'content-type-builder',
    'contenttypes',
    'getcontenttypes',
    0,
    '',
    1,
    NULL,
    NULL
  );
INSERT INTO
  `users-permissions_permission` (
    `id`,
    `type`,
    `controller`,
    `action`,
    `enabled`,
    `policy`,
    `role`,
    `created_by`,
    `updated_by`
  )
VALUES
  (
    72,
    'content-type-builder',
    'contenttypes',
    'getcontenttypes',
    0,
    '',
    2,
    NULL,
    NULL
  );
INSERT INTO
  `users-permissions_permission` (
    `id`,
    `type`,
    `controller`,
    `action`,
    `enabled`,
    `policy`,
    `role`,
    `created_by`,
    `updated_by`
  )
VALUES
  (
    73,
    'content-type-builder',
    'contenttypes',
    'updatecontenttype',
    0,
    '',
    1,
    NULL,
    NULL
  );
INSERT INTO
  `users-permissions_permission` (
    `id`,
    `type`,
    `controller`,
    `action`,
    `enabled`,
    `policy`,
    `role`,
    `created_by`,
    `updated_by`
  )
VALUES
  (
    74,
    'content-type-builder',
    'contenttypes',
    'updatecontenttype',
    0,
    '',
    2,
    NULL,
    NULL
  );
INSERT INTO
  `users-permissions_permission` (
    `id`,
    `type`,
    `controller`,
    `action`,
    `enabled`,
    `policy`,
    `role`,
    `created_by`,
    `updated_by`
  )
VALUES
  (75, 'dump-db', 'dump-db', 'index', 0, '', 1, NULL, NULL);
INSERT INTO
  `users-permissions_permission` (
    `id`,
    `type`,
    `controller`,
    `action`,
    `enabled`,
    `policy`,
    `role`,
    `created_by`,
    `updated_by`
  )
VALUES
  (76, 'dump-db', 'dump-db', 'index', 1, '', 2, NULL, NULL);
INSERT INTO
  `users-permissions_permission` (
    `id`,
    `type`,
    `controller`,
    `action`,
    `enabled`,
    `policy`,
    `role`,
    `created_by`,
    `updated_by`
  )
VALUES
  (
    77,
    'dump-production-db',
    'dump-production-db',
    'index',
    0,
    '',
    1,
    NULL,
    NULL
  );
INSERT INTO
  `users-permissions_permission` (
    `id`,
    `type`,
    `controller`,
    `action`,
    `enabled`,
    `policy`,
    `role`,
    `created_by`,
    `updated_by`
  )
VALUES
  (
    78,
    'dump-production-db',
    'dump-production-db',
    'index',
    1,
    '',
    2,
    NULL,
    NULL
  );
INSERT INTO
  `users-permissions_permission` (
    `id`,
    `type`,
    `controller`,
    `action`,
    `enabled`,
    `policy`,
    `role`,
    `created_by`,
    `updated_by`
  )
VALUES
  (79, 'email', 'email', 'send', 0, '', 1, NULL, NULL);
INSERT INTO
  `users-permissions_permission` (
    `id`,
    `type`,
    `controller`,
    `action`,
    `enabled`,
    `policy`,
    `role`,
    `created_by`,
    `updated_by`
  )
VALUES
  (80, 'email', 'email', 'send', 0, '', 2, NULL, NULL);
INSERT INTO
  `users-permissions_permission` (
    `id`,
    `type`,
    `controller`,
    `action`,
    `enabled`,
    `policy`,
    `role`,
    `created_by`,
    `updated_by`
  )
VALUES
  (81, 'sync-db', 'sync-db', 'index', 0, '', 1, NULL, NULL);
INSERT INTO
  `users-permissions_permission` (
    `id`,
    `type`,
    `controller`,
    `action`,
    `enabled`,
    `policy`,
    `role`,
    `created_by`,
    `updated_by`
  )
VALUES
  (82, 'sync-db', 'sync-db', 'index', 1, '', 2, NULL, NULL);
INSERT INTO
  `users-permissions_permission` (
    `id`,
    `type`,
    `controller`,
    `action`,
    `enabled`,
    `policy`,
    `role`,
    `created_by`,
    `updated_by`
  )
VALUES
  (83, 'upload', 'upload', 'count', 0, '', 1, NULL, NULL);
INSERT INTO
  `users-permissions_permission` (
    `id`,
    `type`,
    `controller`,
    `action`,
    `enabled`,
    `policy`,
    `role`,
    `created_by`,
    `updated_by`
  )
VALUES
  (84, 'upload', 'upload', 'count', 0, '', 2, NULL, NULL);
INSERT INTO
  `users-permissions_permission` (
    `id`,
    `type`,
    `controller`,
    `action`,
    `enabled`,
    `policy`,
    `role`,
    `created_by`,
    `updated_by`
  )
VALUES
  (85, 'upload', 'upload', 'destroy', 0, '', 1, NULL, NULL);
INSERT INTO
  `users-permissions_permission` (
    `id`,
    `type`,
    `controller`,
    `action`,
    `enabled`,
    `policy`,
    `role`,
    `created_by`,
    `updated_by`
  )
VALUES
  (86, 'upload', 'upload', 'destroy', 0, '', 2, NULL, NULL);
INSERT INTO
  `users-permissions_permission` (
    `id`,
    `type`,
    `controller`,
    `action`,
    `enabled`,
    `policy`,
    `role`,
    `created_by`,
    `updated_by`
  )
VALUES
  (87, 'upload', 'upload', 'find', 0, '', 1, NULL, NULL);
INSERT INTO
  `users-permissions_permission` (
    `id`,
    `type`,
    `controller`,
    `action`,
    `enabled`,
    `policy`,
    `role`,
    `created_by`,
    `updated_by`
  )
VALUES
  (88, 'upload', 'upload', 'find', 0, '', 2, NULL, NULL);
INSERT INTO
  `users-permissions_permission` (
    `id`,
    `type`,
    `controller`,
    `action`,
    `enabled`,
    `policy`,
    `role`,
    `created_by`,
    `updated_by`
  )
VALUES
  (89, 'upload', 'upload', 'findone', 0, '', 1, NULL, NULL);
INSERT INTO
  `users-permissions_permission` (
    `id`,
    `type`,
    `controller`,
    `action`,
    `enabled`,
    `policy`,
    `role`,
    `created_by`,
    `updated_by`
  )
VALUES
  (90, 'upload', 'upload', 'findone', 0, '', 2, NULL, NULL);
INSERT INTO
  `users-permissions_permission` (
    `id`,
    `type`,
    `controller`,
    `action`,
    `enabled`,
    `policy`,
    `role`,
    `created_by`,
    `updated_by`
  )
VALUES
  (
    91,
    'upload',
    'upload',
    'getsettings',
    0,
    '',
    1,
    NULL,
    NULL
  );
INSERT INTO
  `users-permissions_permission` (
    `id`,
    `type`,
    `controller`,
    `action`,
    `enabled`,
    `policy`,
    `role`,
    `created_by`,
    `updated_by`
  )
VALUES
  (
    92,
    'upload',
    'upload',
    'getsettings',
    0,
    '',
    2,
    NULL,
    NULL
  );
INSERT INTO
  `users-permissions_permission` (
    `id`,
    `type`,
    `controller`,
    `action`,
    `enabled`,
    `policy`,
    `role`,
    `created_by`,
    `updated_by`
  )
VALUES
  (93, 'upload', 'upload', 'search', 0, '', 1, NULL, NULL);
INSERT INTO
  `users-permissions_permission` (
    `id`,
    `type`,
    `controller`,
    `action`,
    `enabled`,
    `policy`,
    `role`,
    `created_by`,
    `updated_by`
  )
VALUES
  (94, 'upload', 'upload', 'search', 0, '', 2, NULL, NULL);
INSERT INTO
  `users-permissions_permission` (
    `id`,
    `type`,
    `controller`,
    `action`,
    `enabled`,
    `policy`,
    `role`,
    `created_by`,
    `updated_by`
  )
VALUES
  (
    95,
    'upload',
    'upload',
    'updatesettings',
    0,
    '',
    1,
    NULL,
    NULL
  );
INSERT INTO
  `users-permissions_permission` (
    `id`,
    `type`,
    `controller`,
    `action`,
    `enabled`,
    `policy`,
    `role`,
    `created_by`,
    `updated_by`
  )
VALUES
  (
    96,
    'upload',
    'upload',
    'updatesettings',
    0,
    '',
    2,
    NULL,
    NULL
  );
INSERT INTO
  `users-permissions_permission` (
    `id`,
    `type`,
    `controller`,
    `action`,
    `enabled`,
    `policy`,
    `role`,
    `created_by`,
    `updated_by`
  )
VALUES
  (97, 'upload', 'upload', 'upload', 0, '', 1, NULL, NULL);
INSERT INTO
  `users-permissions_permission` (
    `id`,
    `type`,
    `controller`,
    `action`,
    `enabled`,
    `policy`,
    `role`,
    `created_by`,
    `updated_by`
  )
VALUES
  (98, 'upload', 'upload', 'upload', 0, '', 2, NULL, NULL);
INSERT INTO
  `users-permissions_permission` (
    `id`,
    `type`,
    `controller`,
    `action`,
    `enabled`,
    `policy`,
    `role`,
    `created_by`,
    `updated_by`
  )
VALUES
  (
    99,
    'users-permissions',
    'auth',
    'callback',
    0,
    '',
    1,
    NULL,
    NULL
  );
INSERT INTO
  `users-permissions_permission` (
    `id`,
    `type`,
    `controller`,
    `action`,
    `enabled`,
    `policy`,
    `role`,
    `created_by`,
    `updated_by`
  )
VALUES
  (
    100,
    'users-permissions',
    'auth',
    'callback',
    1,
    '',
    2,
    NULL,
    NULL
  );
INSERT INTO
  `users-permissions_permission` (
    `id`,
    `type`,
    `controller`,
    `action`,
    `enabled`,
    `policy`,
    `role`,
    `created_by`,
    `updated_by`
  )
VALUES
  (
    101,
    'users-permissions',
    'auth',
    'connect',
    1,
    '',
    1,
    NULL,
    NULL
  );
INSERT INTO
  `users-permissions_permission` (
    `id`,
    `type`,
    `controller`,
    `action`,
    `enabled`,
    `policy`,
    `role`,
    `created_by`,
    `updated_by`
  )
VALUES
  (
    102,
    'users-permissions',
    'auth',
    'connect',
    1,
    '',
    2,
    NULL,
    NULL
  );
INSERT INTO
  `users-permissions_permission` (
    `id`,
    `type`,
    `controller`,
    `action`,
    `enabled`,
    `policy`,
    `role`,
    `created_by`,
    `updated_by`
  )
VALUES
  (
    103,
    'users-permissions',
    'auth',
    'emailconfirmation',
    0,
    '',
    1,
    NULL,
    NULL
  );
INSERT INTO
  `users-permissions_permission` (
    `id`,
    `type`,
    `controller`,
    `action`,
    `enabled`,
    `policy`,
    `role`,
    `created_by`,
    `updated_by`
  )
VALUES
  (
    104,
    'users-permissions',
    'auth',
    'emailconfirmation',
    1,
    '',
    2,
    NULL,
    NULL
  );
INSERT INTO
  `users-permissions_permission` (
    `id`,
    `type`,
    `controller`,
    `action`,
    `enabled`,
    `policy`,
    `role`,
    `created_by`,
    `updated_by`
  )
VALUES
  (
    105,
    'users-permissions',
    'auth',
    'forgotpassword',
    0,
    '',
    1,
    NULL,
    NULL
  );
INSERT INTO
  `users-permissions_permission` (
    `id`,
    `type`,
    `controller`,
    `action`,
    `enabled`,
    `policy`,
    `role`,
    `created_by`,
    `updated_by`
  )
VALUES
  (
    106,
    'users-permissions',
    'auth',
    'forgotpassword',
    1,
    '',
    2,
    NULL,
    NULL
  );
INSERT INTO
  `users-permissions_permission` (
    `id`,
    `type`,
    `controller`,
    `action`,
    `enabled`,
    `policy`,
    `role`,
    `created_by`,
    `updated_by`
  )
VALUES
  (
    107,
    'users-permissions',
    'auth',
    'register',
    0,
    '',
    1,
    NULL,
    NULL
  );
INSERT INTO
  `users-permissions_permission` (
    `id`,
    `type`,
    `controller`,
    `action`,
    `enabled`,
    `policy`,
    `role`,
    `created_by`,
    `updated_by`
  )
VALUES
  (
    108,
    'users-permissions',
    'auth',
    'register',
    1,
    '',
    2,
    NULL,
    NULL
  );
INSERT INTO
  `users-permissions_permission` (
    `id`,
    `type`,
    `controller`,
    `action`,
    `enabled`,
    `policy`,
    `role`,
    `created_by`,
    `updated_by`
  )
VALUES
  (
    109,
    'users-permissions',
    'auth',
    'resetpassword',
    0,
    '',
    1,
    NULL,
    NULL
  );
INSERT INTO
  `users-permissions_permission` (
    `id`,
    `type`,
    `controller`,
    `action`,
    `enabled`,
    `policy`,
    `role`,
    `created_by`,
    `updated_by`
  )
VALUES
  (
    110,
    'users-permissions',
    'auth',
    'resetpassword',
    1,
    '',
    2,
    NULL,
    NULL
  );
INSERT INTO
  `users-permissions_permission` (
    `id`,
    `type`,
    `controller`,
    `action`,
    `enabled`,
    `policy`,
    `role`,
    `created_by`,
    `updated_by`
  )
VALUES
  (
    111,
    'users-permissions',
    'auth',
    'sendemailconfirmation',
    0,
    '',
    1,
    NULL,
    NULL
  );
INSERT INTO
  `users-permissions_permission` (
    `id`,
    `type`,
    `controller`,
    `action`,
    `enabled`,
    `policy`,
    `role`,
    `created_by`,
    `updated_by`
  )
VALUES
  (
    112,
    'users-permissions',
    'auth',
    'sendemailconfirmation',
    0,
    '',
    2,
    NULL,
    NULL
  );
INSERT INTO
  `users-permissions_permission` (
    `id`,
    `type`,
    `controller`,
    `action`,
    `enabled`,
    `policy`,
    `role`,
    `created_by`,
    `updated_by`
  )
VALUES
  (
    113,
    'users-permissions',
    'user',
    'count',
    0,
    '',
    1,
    NULL,
    NULL
  );
INSERT INTO
  `users-permissions_permission` (
    `id`,
    `type`,
    `controller`,
    `action`,
    `enabled`,
    `policy`,
    `role`,
    `created_by`,
    `updated_by`
  )
VALUES
  (
    114,
    'users-permissions',
    'user',
    'count',
    0,
    '',
    2,
    NULL,
    NULL
  );
INSERT INTO
  `users-permissions_permission` (
    `id`,
    `type`,
    `controller`,
    `action`,
    `enabled`,
    `policy`,
    `role`,
    `created_by`,
    `updated_by`
  )
VALUES
  (
    115,
    'users-permissions',
    'user',
    'create',
    0,
    '',
    1,
    NULL,
    NULL
  );
INSERT INTO
  `users-permissions_permission` (
    `id`,
    `type`,
    `controller`,
    `action`,
    `enabled`,
    `policy`,
    `role`,
    `created_by`,
    `updated_by`
  )
VALUES
  (
    116,
    'users-permissions',
    'user',
    'create',
    0,
    '',
    2,
    NULL,
    NULL
  );
INSERT INTO
  `users-permissions_permission` (
    `id`,
    `type`,
    `controller`,
    `action`,
    `enabled`,
    `policy`,
    `role`,
    `created_by`,
    `updated_by`
  )
VALUES
  (
    117,
    'users-permissions',
    'user',
    'destroy',
    0,
    '',
    1,
    NULL,
    NULL
  );
INSERT INTO
  `users-permissions_permission` (
    `id`,
    `type`,
    `controller`,
    `action`,
    `enabled`,
    `policy`,
    `role`,
    `created_by`,
    `updated_by`
  )
VALUES
  (
    118,
    'users-permissions',
    'user',
    'destroy',
    0,
    '',
    2,
    NULL,
    NULL
  );
INSERT INTO
  `users-permissions_permission` (
    `id`,
    `type`,
    `controller`,
    `action`,
    `enabled`,
    `policy`,
    `role`,
    `created_by`,
    `updated_by`
  )
VALUES
  (
    119,
    'users-permissions',
    'user',
    'destroyall',
    0,
    '',
    1,
    NULL,
    NULL
  );
INSERT INTO
  `users-permissions_permission` (
    `id`,
    `type`,
    `controller`,
    `action`,
    `enabled`,
    `policy`,
    `role`,
    `created_by`,
    `updated_by`
  )
VALUES
  (
    120,
    'users-permissions',
    'user',
    'destroyall',
    0,
    '',
    2,
    NULL,
    NULL
  );
INSERT INTO
  `users-permissions_permission` (
    `id`,
    `type`,
    `controller`,
    `action`,
    `enabled`,
    `policy`,
    `role`,
    `created_by`,
    `updated_by`
  )
VALUES
  (
    121,
    'users-permissions',
    'user',
    'find',
    0,
    '',
    1,
    NULL,
    NULL
  );
INSERT INTO
  `users-permissions_permission` (
    `id`,
    `type`,
    `controller`,
    `action`,
    `enabled`,
    `policy`,
    `role`,
    `created_by`,
    `updated_by`
  )
VALUES
  (
    122,
    'users-permissions',
    'user',
    'find',
    0,
    '',
    2,
    NULL,
    NULL
  );
INSERT INTO
  `users-permissions_permission` (
    `id`,
    `type`,
    `controller`,
    `action`,
    `enabled`,
    `policy`,
    `role`,
    `created_by`,
    `updated_by`
  )
VALUES
  (
    123,
    'users-permissions',
    'user',
    'findone',
    0,
    '',
    1,
    NULL,
    NULL
  );
INSERT INTO
  `users-permissions_permission` (
    `id`,
    `type`,
    `controller`,
    `action`,
    `enabled`,
    `policy`,
    `role`,
    `created_by`,
    `updated_by`
  )
VALUES
  (
    124,
    'users-permissions',
    'user',
    'findone',
    0,
    '',
    2,
    NULL,
    NULL
  );
INSERT INTO
  `users-permissions_permission` (
    `id`,
    `type`,
    `controller`,
    `action`,
    `enabled`,
    `policy`,
    `role`,
    `created_by`,
    `updated_by`
  )
VALUES
  (
    125,
    'users-permissions',
    'user',
    'me',
    1,
    '',
    1,
    NULL,
    NULL
  );
INSERT INTO
  `users-permissions_permission` (
    `id`,
    `type`,
    `controller`,
    `action`,
    `enabled`,
    `policy`,
    `role`,
    `created_by`,
    `updated_by`
  )
VALUES
  (
    126,
    'users-permissions',
    'user',
    'me',
    1,
    '',
    2,
    NULL,
    NULL
  );
INSERT INTO
  `users-permissions_permission` (
    `id`,
    `type`,
    `controller`,
    `action`,
    `enabled`,
    `policy`,
    `role`,
    `created_by`,
    `updated_by`
  )
VALUES
  (
    127,
    'users-permissions',
    'user',
    'update',
    0,
    '',
    1,
    NULL,
    NULL
  );
INSERT INTO
  `users-permissions_permission` (
    `id`,
    `type`,
    `controller`,
    `action`,
    `enabled`,
    `policy`,
    `role`,
    `created_by`,
    `updated_by`
  )
VALUES
  (
    128,
    'users-permissions',
    'user',
    'update',
    0,
    '',
    2,
    NULL,
    NULL
  );
INSERT INTO
  `users-permissions_permission` (
    `id`,
    `type`,
    `controller`,
    `action`,
    `enabled`,
    `policy`,
    `role`,
    `created_by`,
    `updated_by`
  )
VALUES
  (
    129,
    'users-permissions',
    'userspermissions',
    'createrole',
    0,
    '',
    1,
    NULL,
    NULL
  );
INSERT INTO
  `users-permissions_permission` (
    `id`,
    `type`,
    `controller`,
    `action`,
    `enabled`,
    `policy`,
    `role`,
    `created_by`,
    `updated_by`
  )
VALUES
  (
    130,
    'users-permissions',
    'userspermissions',
    'createrole',
    0,
    '',
    2,
    NULL,
    NULL
  );
INSERT INTO
  `users-permissions_permission` (
    `id`,
    `type`,
    `controller`,
    `action`,
    `enabled`,
    `policy`,
    `role`,
    `created_by`,
    `updated_by`
  )
VALUES
  (
    131,
    'users-permissions',
    'userspermissions',
    'deleterole',
    0,
    '',
    1,
    NULL,
    NULL
  );
INSERT INTO
  `users-permissions_permission` (
    `id`,
    `type`,
    `controller`,
    `action`,
    `enabled`,
    `policy`,
    `role`,
    `created_by`,
    `updated_by`
  )
VALUES
  (
    132,
    'users-permissions',
    'userspermissions',
    'deleterole',
    0,
    '',
    2,
    NULL,
    NULL
  );
INSERT INTO
  `users-permissions_permission` (
    `id`,
    `type`,
    `controller`,
    `action`,
    `enabled`,
    `policy`,
    `role`,
    `created_by`,
    `updated_by`
  )
VALUES
  (
    133,
    'users-permissions',
    'userspermissions',
    'getadvancedsettings',
    0,
    '',
    1,
    NULL,
    NULL
  );
INSERT INTO
  `users-permissions_permission` (
    `id`,
    `type`,
    `controller`,
    `action`,
    `enabled`,
    `policy`,
    `role`,
    `created_by`,
    `updated_by`
  )
VALUES
  (
    134,
    'users-permissions',
    'userspermissions',
    'getadvancedsettings',
    0,
    '',
    2,
    NULL,
    NULL
  );
INSERT INTO
  `users-permissions_permission` (
    `id`,
    `type`,
    `controller`,
    `action`,
    `enabled`,
    `policy`,
    `role`,
    `created_by`,
    `updated_by`
  )
VALUES
  (
    135,
    'users-permissions',
    'userspermissions',
    'getemailtemplate',
    0,
    '',
    1,
    NULL,
    NULL
  );
INSERT INTO
  `users-permissions_permission` (
    `id`,
    `type`,
    `controller`,
    `action`,
    `enabled`,
    `policy`,
    `role`,
    `created_by`,
    `updated_by`
  )
VALUES
  (
    136,
    'users-permissions',
    'userspermissions',
    'getemailtemplate',
    0,
    '',
    2,
    NULL,
    NULL
  );
INSERT INTO
  `users-permissions_permission` (
    `id`,
    `type`,
    `controller`,
    `action`,
    `enabled`,
    `policy`,
    `role`,
    `created_by`,
    `updated_by`
  )
VALUES
  (
    137,
    'users-permissions',
    'userspermissions',
    'getpermissions',
    0,
    '',
    1,
    NULL,
    NULL
  );
INSERT INTO
  `users-permissions_permission` (
    `id`,
    `type`,
    `controller`,
    `action`,
    `enabled`,
    `policy`,
    `role`,
    `created_by`,
    `updated_by`
  )
VALUES
  (
    138,
    'users-permissions',
    'userspermissions',
    'getpermissions',
    0,
    '',
    2,
    NULL,
    NULL
  );
INSERT INTO
  `users-permissions_permission` (
    `id`,
    `type`,
    `controller`,
    `action`,
    `enabled`,
    `policy`,
    `role`,
    `created_by`,
    `updated_by`
  )
VALUES
  (
    139,
    'users-permissions',
    'userspermissions',
    'getpolicies',
    0,
    '',
    1,
    NULL,
    NULL
  );
INSERT INTO
  `users-permissions_permission` (
    `id`,
    `type`,
    `controller`,
    `action`,
    `enabled`,
    `policy`,
    `role`,
    `created_by`,
    `updated_by`
  )
VALUES
  (
    140,
    'users-permissions',
    'userspermissions',
    'getpolicies',
    0,
    '',
    2,
    NULL,
    NULL
  );
INSERT INTO
  `users-permissions_permission` (
    `id`,
    `type`,
    `controller`,
    `action`,
    `enabled`,
    `policy`,
    `role`,
    `created_by`,
    `updated_by`
  )
VALUES
  (
    141,
    'users-permissions',
    'userspermissions',
    'getproviders',
    0,
    '',
    1,
    NULL,
    NULL
  );
INSERT INTO
  `users-permissions_permission` (
    `id`,
    `type`,
    `controller`,
    `action`,
    `enabled`,
    `policy`,
    `role`,
    `created_by`,
    `updated_by`
  )
VALUES
  (
    142,
    'users-permissions',
    'userspermissions',
    'getproviders',
    0,
    '',
    2,
    NULL,
    NULL
  );
INSERT INTO
  `users-permissions_permission` (
    `id`,
    `type`,
    `controller`,
    `action`,
    `enabled`,
    `policy`,
    `role`,
    `created_by`,
    `updated_by`
  )
VALUES
  (
    143,
    'users-permissions',
    'userspermissions',
    'getrole',
    0,
    '',
    1,
    NULL,
    NULL
  );
INSERT INTO
  `users-permissions_permission` (
    `id`,
    `type`,
    `controller`,
    `action`,
    `enabled`,
    `policy`,
    `role`,
    `created_by`,
    `updated_by`
  )
VALUES
  (
    144,
    'users-permissions',
    'userspermissions',
    'getrole',
    0,
    '',
    2,
    NULL,
    NULL
  );
INSERT INTO
  `users-permissions_permission` (
    `id`,
    `type`,
    `controller`,
    `action`,
    `enabled`,
    `policy`,
    `role`,
    `created_by`,
    `updated_by`
  )
VALUES
  (
    145,
    'users-permissions',
    'userspermissions',
    'getroles',
    0,
    '',
    1,
    NULL,
    NULL
  );
INSERT INTO
  `users-permissions_permission` (
    `id`,
    `type`,
    `controller`,
    `action`,
    `enabled`,
    `policy`,
    `role`,
    `created_by`,
    `updated_by`
  )
VALUES
  (
    146,
    'users-permissions',
    'userspermissions',
    'getroles',
    0,
    '',
    2,
    NULL,
    NULL
  );
INSERT INTO
  `users-permissions_permission` (
    `id`,
    `type`,
    `controller`,
    `action`,
    `enabled`,
    `policy`,
    `role`,
    `created_by`,
    `updated_by`
  )
VALUES
  (
    147,
    'users-permissions',
    'userspermissions',
    'getroutes',
    0,
    '',
    1,
    NULL,
    NULL
  );
INSERT INTO
  `users-permissions_permission` (
    `id`,
    `type`,
    `controller`,
    `action`,
    `enabled`,
    `policy`,
    `role`,
    `created_by`,
    `updated_by`
  )
VALUES
  (
    148,
    'users-permissions',
    'userspermissions',
    'getroutes',
    0,
    '',
    2,
    NULL,
    NULL
  );
INSERT INTO
  `users-permissions_permission` (
    `id`,
    `type`,
    `controller`,
    `action`,
    `enabled`,
    `policy`,
    `role`,
    `created_by`,
    `updated_by`
  )
VALUES
  (
    149,
    'users-permissions',
    'userspermissions',
    'index',
    0,
    '',
    1,
    NULL,
    NULL
  );
INSERT INTO
  `users-permissions_permission` (
    `id`,
    `type`,
    `controller`,
    `action`,
    `enabled`,
    `policy`,
    `role`,
    `created_by`,
    `updated_by`
  )
VALUES
  (
    150,
    'users-permissions',
    'userspermissions',
    'index',
    0,
    '',
    2,
    NULL,
    NULL
  );
INSERT INTO
  `users-permissions_permission` (
    `id`,
    `type`,
    `controller`,
    `action`,
    `enabled`,
    `policy`,
    `role`,
    `created_by`,
    `updated_by`
  )
VALUES
  (
    151,
    'users-permissions',
    'userspermissions',
    'searchusers',
    0,
    '',
    1,
    NULL,
    NULL
  );
INSERT INTO
  `users-permissions_permission` (
    `id`,
    `type`,
    `controller`,
    `action`,
    `enabled`,
    `policy`,
    `role`,
    `created_by`,
    `updated_by`
  )
VALUES
  (
    152,
    'users-permissions',
    'userspermissions',
    'searchusers',
    0,
    '',
    2,
    NULL,
    NULL
  );
INSERT INTO
  `users-permissions_permission` (
    `id`,
    `type`,
    `controller`,
    `action`,
    `enabled`,
    `policy`,
    `role`,
    `created_by`,
    `updated_by`
  )
VALUES
  (
    153,
    'users-permissions',
    'userspermissions',
    'updateadvancedsettings',
    0,
    '',
    1,
    NULL,
    NULL
  );
INSERT INTO
  `users-permissions_permission` (
    `id`,
    `type`,
    `controller`,
    `action`,
    `enabled`,
    `policy`,
    `role`,
    `created_by`,
    `updated_by`
  )
VALUES
  (
    154,
    'users-permissions',
    'userspermissions',
    'updateadvancedsettings',
    0,
    '',
    2,
    NULL,
    NULL
  );
INSERT INTO
  `users-permissions_permission` (
    `id`,
    `type`,
    `controller`,
    `action`,
    `enabled`,
    `policy`,
    `role`,
    `created_by`,
    `updated_by`
  )
VALUES
  (
    155,
    'users-permissions',
    'userspermissions',
    'updateemailtemplate',
    0,
    '',
    1,
    NULL,
    NULL
  );
INSERT INTO
  `users-permissions_permission` (
    `id`,
    `type`,
    `controller`,
    `action`,
    `enabled`,
    `policy`,
    `role`,
    `created_by`,
    `updated_by`
  )
VALUES
  (
    156,
    'users-permissions',
    'userspermissions',
    'updateemailtemplate',
    0,
    '',
    2,
    NULL,
    NULL
  );
INSERT INTO
  `users-permissions_permission` (
    `id`,
    `type`,
    `controller`,
    `action`,
    `enabled`,
    `policy`,
    `role`,
    `created_by`,
    `updated_by`
  )
VALUES
  (
    157,
    'users-permissions',
    'userspermissions',
    'updateproviders',
    0,
    '',
    1,
    NULL,
    NULL
  );
INSERT INTO
  `users-permissions_permission` (
    `id`,
    `type`,
    `controller`,
    `action`,
    `enabled`,
    `policy`,
    `role`,
    `created_by`,
    `updated_by`
  )
VALUES
  (
    158,
    'users-permissions',
    'userspermissions',
    'updateproviders',
    0,
    '',
    2,
    NULL,
    NULL
  );
INSERT INTO
  `users-permissions_permission` (
    `id`,
    `type`,
    `controller`,
    `action`,
    `enabled`,
    `policy`,
    `role`,
    `created_by`,
    `updated_by`
  )
VALUES
  (
    159,
    'users-permissions',
    'userspermissions',
    'updaterole',
    0,
    '',
    1,
    NULL,
    NULL
  );
INSERT INTO
  `users-permissions_permission` (
    `id`,
    `type`,
    `controller`,
    `action`,
    `enabled`,
    `policy`,
    `role`,
    `created_by`,
    `updated_by`
  )
VALUES
  (
    160,
    'users-permissions',
    'userspermissions',
    'updaterole',
    0,
    '',
    2,
    NULL,
    NULL
  );
INSERT INTO
  `users-permissions_permission` (
    `id`,
    `type`,
    `controller`,
    `action`,
    `enabled`,
    `policy`,
    `role`,
    `created_by`,
    `updated_by`
  )
VALUES
  (
    161,
    'application',
    'index-page',
    'count',
    0,
    '',
    1,
    NULL,
    NULL
  );
INSERT INTO
  `users-permissions_permission` (
    `id`,
    `type`,
    `controller`,
    `action`,
    `enabled`,
    `policy`,
    `role`,
    `created_by`,
    `updated_by`
  )
VALUES
  (
    162,
    'application',
    'index-page',
    'count',
    0,
    '',
    2,
    NULL,
    NULL
  );
INSERT INTO
  `users-permissions_permission` (
    `id`,
    `type`,
    `controller`,
    `action`,
    `enabled`,
    `policy`,
    `role`,
    `created_by`,
    `updated_by`
  )
VALUES
  (
    163,
    'application',
    'index-page',
    'create',
    0,
    '',
    1,
    NULL,
    NULL
  );
INSERT INTO
  `users-permissions_permission` (
    `id`,
    `type`,
    `controller`,
    `action`,
    `enabled`,
    `policy`,
    `role`,
    `created_by`,
    `updated_by`
  )
VALUES
  (
    164,
    'application',
    'index-page',
    'create',
    0,
    '',
    2,
    NULL,
    NULL
  );
INSERT INTO
  `users-permissions_permission` (
    `id`,
    `type`,
    `controller`,
    `action`,
    `enabled`,
    `policy`,
    `role`,
    `created_by`,
    `updated_by`
  )
VALUES
  (
    165,
    'application',
    'index-page',
    'delete',
    0,
    '',
    1,
    NULL,
    NULL
  );
INSERT INTO
  `users-permissions_permission` (
    `id`,
    `type`,
    `controller`,
    `action`,
    `enabled`,
    `policy`,
    `role`,
    `created_by`,
    `updated_by`
  )
VALUES
  (
    166,
    'application',
    'index-page',
    'delete',
    0,
    '',
    2,
    NULL,
    NULL
  );
INSERT INTO
  `users-permissions_permission` (
    `id`,
    `type`,
    `controller`,
    `action`,
    `enabled`,
    `policy`,
    `role`,
    `created_by`,
    `updated_by`
  )
VALUES
  (
    167,
    'application',
    'index-page',
    'find',
    0,
    '',
    1,
    NULL,
    NULL
  );
INSERT INTO
  `users-permissions_permission` (
    `id`,
    `type`,
    `controller`,
    `action`,
    `enabled`,
    `policy`,
    `role`,
    `created_by`,
    `updated_by`
  )
VALUES
  (
    168,
    'application',
    'index-page',
    'find',
    1,
    '',
    2,
    NULL,
    NULL
  );
INSERT INTO
  `users-permissions_permission` (
    `id`,
    `type`,
    `controller`,
    `action`,
    `enabled`,
    `policy`,
    `role`,
    `created_by`,
    `updated_by`
  )
VALUES
  (
    169,
    'application',
    'index-page',
    'findone',
    0,
    '',
    1,
    NULL,
    NULL
  );
INSERT INTO
  `users-permissions_permission` (
    `id`,
    `type`,
    `controller`,
    `action`,
    `enabled`,
    `policy`,
    `role`,
    `created_by`,
    `updated_by`
  )
VALUES
  (
    170,
    'application',
    'index-page',
    'findone',
    1,
    '',
    2,
    NULL,
    NULL
  );
INSERT INTO
  `users-permissions_permission` (
    `id`,
    `type`,
    `controller`,
    `action`,
    `enabled`,
    `policy`,
    `role`,
    `created_by`,
    `updated_by`
  )
VALUES
  (
    171,
    'application',
    'index-page',
    'update',
    0,
    '',
    1,
    NULL,
    NULL
  );
INSERT INTO
  `users-permissions_permission` (
    `id`,
    `type`,
    `controller`,
    `action`,
    `enabled`,
    `policy`,
    `role`,
    `created_by`,
    `updated_by`
  )
VALUES
  (
    172,
    'application',
    'index-page',
    'update',
    0,
    '',
    2,
    NULL,
    NULL
  );
INSERT INTO
  `users-permissions_permission` (
    `id`,
    `type`,
    `controller`,
    `action`,
    `enabled`,
    `policy`,
    `role`,
    `created_by`,
    `updated_by`
  )
VALUES
  (
    173,
    'application',
    'language',
    'count',
    0,
    '',
    1,
    NULL,
    NULL
  );
INSERT INTO
  `users-permissions_permission` (
    `id`,
    `type`,
    `controller`,
    `action`,
    `enabled`,
    `policy`,
    `role`,
    `created_by`,
    `updated_by`
  )
VALUES
  (
    174,
    'application',
    'language',
    'count',
    0,
    '',
    2,
    NULL,
    NULL
  );
INSERT INTO
  `users-permissions_permission` (
    `id`,
    `type`,
    `controller`,
    `action`,
    `enabled`,
    `policy`,
    `role`,
    `created_by`,
    `updated_by`
  )
VALUES
  (
    175,
    'application',
    'language',
    'create',
    0,
    '',
    1,
    NULL,
    NULL
  );
INSERT INTO
  `users-permissions_permission` (
    `id`,
    `type`,
    `controller`,
    `action`,
    `enabled`,
    `policy`,
    `role`,
    `created_by`,
    `updated_by`
  )
VALUES
  (
    176,
    'application',
    'language',
    'create',
    0,
    '',
    2,
    NULL,
    NULL
  );
INSERT INTO
  `users-permissions_permission` (
    `id`,
    `type`,
    `controller`,
    `action`,
    `enabled`,
    `policy`,
    `role`,
    `created_by`,
    `updated_by`
  )
VALUES
  (
    177,
    'application',
    'language',
    'delete',
    0,
    '',
    1,
    NULL,
    NULL
  );
INSERT INTO
  `users-permissions_permission` (
    `id`,
    `type`,
    `controller`,
    `action`,
    `enabled`,
    `policy`,
    `role`,
    `created_by`,
    `updated_by`
  )
VALUES
  (
    178,
    'application',
    'language',
    'delete',
    0,
    '',
    2,
    NULL,
    NULL
  );
INSERT INTO
  `users-permissions_permission` (
    `id`,
    `type`,
    `controller`,
    `action`,
    `enabled`,
    `policy`,
    `role`,
    `created_by`,
    `updated_by`
  )
VALUES
  (
    179,
    'application',
    'language',
    'find',
    0,
    '',
    1,
    NULL,
    NULL
  );
INSERT INTO
  `users-permissions_permission` (
    `id`,
    `type`,
    `controller`,
    `action`,
    `enabled`,
    `policy`,
    `role`,
    `created_by`,
    `updated_by`
  )
VALUES
  (
    180,
    'application',
    'language',
    'find',
    1,
    '',
    2,
    NULL,
    NULL
  );
INSERT INTO
  `users-permissions_permission` (
    `id`,
    `type`,
    `controller`,
    `action`,
    `enabled`,
    `policy`,
    `role`,
    `created_by`,
    `updated_by`
  )
VALUES
  (
    181,
    'application',
    'language',
    'findone',
    0,
    '',
    1,
    NULL,
    NULL
  );
INSERT INTO
  `users-permissions_permission` (
    `id`,
    `type`,
    `controller`,
    `action`,
    `enabled`,
    `policy`,
    `role`,
    `created_by`,
    `updated_by`
  )
VALUES
  (
    182,
    'application',
    'language',
    'findone',
    1,
    '',
    2,
    NULL,
    NULL
  );
INSERT INTO
  `users-permissions_permission` (
    `id`,
    `type`,
    `controller`,
    `action`,
    `enabled`,
    `policy`,
    `role`,
    `created_by`,
    `updated_by`
  )
VALUES
  (
    183,
    'application',
    'language',
    'update',
    0,
    '',
    1,
    NULL,
    NULL
  );
INSERT INTO
  `users-permissions_permission` (
    `id`,
    `type`,
    `controller`,
    `action`,
    `enabled`,
    `policy`,
    `role`,
    `created_by`,
    `updated_by`
  )
VALUES
  (
    184,
    'application',
    'language',
    'update',
    0,
    '',
    2,
    NULL,
    NULL
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: users-permissions_role
# ------------------------------------------------------------

INSERT INTO
  `users-permissions_role` (
    `id`,
    `name`,
    `description`,
    `type`,
    `created_by`,
    `updated_by`
  )
VALUES
  (
    1,
    'Authenticated',
    'Default role given to authenticated user.',
    'authenticated',
    NULL,
    NULL
  );
INSERT INTO
  `users-permissions_role` (
    `id`,
    `name`,
    `description`,
    `type`,
    `created_by`,
    `updated_by`
  )
VALUES
  (
    2,
    'Public',
    'Default role given to unauthenticated user.',
    'public',
    NULL,
    NULL
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: users-permissions_user
# ------------------------------------------------------------


/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

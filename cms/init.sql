/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: components_creative_component_creative_items
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `components_creative_component_creative_items` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `description` longtext,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 55 DEFAULT CHARSET = latin1;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: components_page_heads
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `components_page_heads` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL,
  `description` longtext,
  `ogType` varchar(255) DEFAULT NULL,
  `shouldIndex` tinyint(1) DEFAULT NULL,
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
# SCHEMA DUMP FOR TABLE: components_page_localized_heads
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `components_page_localized_heads` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `ogType` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 10 DEFAULT CHARSET = latin1;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: components_page_localized_heads_components
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `components_page_localized_heads_components` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `field` varchar(255) NOT NULL,
  `order` int(10) unsigned NOT NULL,
  `component_type` varchar(255) NOT NULL,
  `component_id` int(11) NOT NULL,
  `components_page_localized_head_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `components_page_localized_head_id_fk` (`components_page_localized_head_id`),
  CONSTRAINT `components_page_localized_head_id_fk` FOREIGN KEY (`components_page_localized_head_id`) REFERENCES `components_page_localized_heads` (`id`) ON DELETE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 19 DEFAULT CHARSET = latin1;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: components_page_localized_long_texts
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `components_page_localized_long_texts` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `language` int(11) DEFAULT NULL,
  `text` longtext,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 10 DEFAULT CHARSET = latin1;

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
) ENGINE = InnoDB AUTO_INCREMENT = 19 DEFAULT CHARSET = latin1;

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
) ENGINE = InnoDB AUTO_INCREMENT = 46 DEFAULT CHARSET = latin1;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: flow_pages
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `flow_pages` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `language` int(11) DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `updated_by` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `asideDescription` longtext,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 2 DEFAULT CHARSET = latin1;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: flow_pages_components
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `flow_pages_components` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `field` varchar(255) NOT NULL,
  `order` int(10) unsigned NOT NULL,
  `component_type` varchar(255) NOT NULL,
  `component_id` int(11) NOT NULL,
  `flow_page_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `flow_page_id_fk` (`flow_page_id`),
  CONSTRAINT `flow_page_id_fk` FOREIGN KEY (`flow_page_id`) REFERENCES `flow_pages` (`id`) ON DELETE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 7 DEFAULT CHARSET = latin1;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: index_pages
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `index_pages` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `language` int(11) DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `updated_by` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
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
# SCHEMA DUMP FOR TABLE: projects
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `projects` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `urlSlug` varchar(255) DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `updated_by` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `projects_urlslug_unique` (`urlSlug`)
) ENGINE = InnoDB AUTO_INCREMENT = 10 DEFAULT CHARSET = latin1;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: projects_components
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `projects_components` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `field` varchar(255) NOT NULL,
  `order` int(10) unsigned NOT NULL,
  `component_type` varchar(255) NOT NULL,
  `component_id` int(11) NOT NULL,
  `project_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `project_id_fk` (`project_id`),
  CONSTRAINT `project_id_fk` FOREIGN KEY (`project_id`) REFERENCES `projects` (`id`) ON DELETE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 67 DEFAULT CHARSET = latin1;

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
) ENGINE = InnoDB AUTO_INCREMENT = 86 DEFAULT CHARSET = latin1;

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
) ENGINE = InnoDB AUTO_INCREMENT = 62 DEFAULT CHARSET = latin1;

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
) ENGINE = InnoDB AUTO_INCREMENT = 431 DEFAULT CHARSET = latin1;

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
) ENGINE = InnoDB AUTO_INCREMENT = 209 DEFAULT CHARSET = latin1;

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
# DATA DUMP FOR TABLE: components_creative_component_creative_items
# ------------------------------------------------------------

INSERT INTO
  `components_creative_component_creative_items` (`id`, `name`, `description`)
VALUES
  (
    1,
    'Forest 2021',
    'Lorem ipsum dolor sit amet, conse ctetur adipiscing elit, sed do eiusmod tempor incididunt ali'
  );
INSERT INTO
  `components_creative_component_creative_items` (`id`, `name`, `description`)
VALUES
  (
    2,
    'Ocean 2020',
    'Lorem ipsum dolor siqua. Ut enim ad minim veniam, quis nostrud exercitation ur incididunt ali.'
  );
INSERT INTO
  `components_creative_component_creative_items` (`id`, `name`, `description`)
VALUES
  (
    3,
    'Fire 2021',
    'Isum dolor sit amet, conse ctetum ad minim veniam, quis nostrud exercitation.'
  );
INSERT INTO
  `components_creative_component_creative_items` (`id`, `name`, `description`)
VALUES
  (
    4,
    'Forest',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolor.'
  );
INSERT INTO
  `components_creative_component_creative_items` (`id`, `name`, `description`)
VALUES
  (
    5,
    'Ocean',
    'Lot, consectetur adipiscirem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod re et dolor.'
  );
INSERT INTO
  `components_creative_component_creative_items` (`id`, `name`, `description`)
VALUES
  (
    6,
    'Fire',
    'Num vitae sapien pellentesque habitant morbi tristique senectus. Diam vulputate ut pharetra sit amet aliquam id diam. Risus.'
  );
INSERT INTO
  `components_creative_component_creative_items` (`id`, `name`, `description`)
VALUES
  (7, 'La Lambo', 'Lamborghini Aventador white');
INSERT INTO
  `components_creative_component_creative_items` (`id`, `name`, `description`)
VALUES
  (8, 'Night In Tokyo', '');
INSERT INTO
  `components_creative_component_creative_items` (`id`, `name`, `description`)
VALUES
  (9, 'DeLorean', NULL);
INSERT INTO
  `components_creative_component_creative_items` (`id`, `name`, `description`)
VALUES
  (11, 'Nature', 'description');
INSERT INTO
  `components_creative_component_creative_items` (`id`, `name`, `description`)
VALUES
  (12, 'Retro', 'description');
INSERT INTO
  `components_creative_component_creative_items` (`id`, `name`, `description`)
VALUES
  (13, 'Summer', 'description');
INSERT INTO
  `components_creative_component_creative_items` (`id`, `name`, `description`)
VALUES
  (14, 'Canyon', 'description');
INSERT INTO
  `components_creative_component_creative_items` (`id`, `name`, `description`)
VALUES
  (15, 'Aisle', 'description');
INSERT INTO
  `components_creative_component_creative_items` (`id`, `name`, `description`)
VALUES
  (16, 'Ice', 'Description');
INSERT INTO
  `components_creative_component_creative_items` (`id`, `name`, `description`)
VALUES
  (17, 'Forest', 'description');
INSERT INTO
  `components_creative_component_creative_items` (`id`, `name`, `description`)
VALUES
  (18, 'Fire', 'description');
INSERT INTO
  `components_creative_component_creative_items` (`id`, `name`, `description`)
VALUES
  (19, 'Tsunami', 'Description');
INSERT INTO
  `components_creative_component_creative_items` (`id`, `name`, `description`)
VALUES
  (20, 'Green', 'description');
INSERT INTO
  `components_creative_component_creative_items` (`id`, `name`, `description`)
VALUES
  (21, 'Space', 'description');
INSERT INTO
  `components_creative_component_creative_items` (`id`, `name`, `description`)
VALUES
  (22, 'first image', 'description');
INSERT INTO
  `components_creative_component_creative_items` (`id`, `name`, `description`)
VALUES
  (23, 'second image', 'desc');
INSERT INTO
  `components_creative_component_creative_items` (`id`, `name`, `description`)
VALUES
  (24, 'third ', 'desc');
INSERT INTO
  `components_creative_component_creative_items` (`id`, `name`, `description`)
VALUES
  (25, 'four', 'desc');
INSERT INTO
  `components_creative_component_creative_items` (`id`, `name`, `description`)
VALUES
  (26, 'fifth', 'esc');
INSERT INTO
  `components_creative_component_creative_items` (`id`, `name`, `description`)
VALUES
  (27, 'six', 'des');
INSERT INTO
  `components_creative_component_creative_items` (`id`, `name`, `description`)
VALUES
  (28, 'sev', 'desc');
INSERT INTO
  `components_creative_component_creative_items` (`id`, `name`, `description`)
VALUES
  (29, 'eight', 'desc');
INSERT INTO
  `components_creative_component_creative_items` (`id`, `name`, `description`)
VALUES
  (30, 'nine', 'desc');
INSERT INTO
  `components_creative_component_creative_items` (`id`, `name`, `description`)
VALUES
  (31, 'ten', 'desc');
INSERT INTO
  `components_creative_component_creative_items` (`id`, `name`, `description`)
VALUES
  (32, 'four', 'desc');
INSERT INTO
  `components_creative_component_creative_items` (`id`, `name`, `description`)
VALUES
  (33, 'twelve', 'dsc');
INSERT INTO
  `components_creative_component_creative_items` (`id`, `name`, `description`)
VALUES
  (34, 't13', 'desc');
INSERT INTO
  `components_creative_component_creative_items` (`id`, `name`, `description`)
VALUES
  (35, 't14', NULL);
INSERT INTO
  `components_creative_component_creative_items` (`id`, `name`, `description`)
VALUES
  (36, 't15', 'desc');
INSERT INTO
  `components_creative_component_creative_items` (`id`, `name`, `description`)
VALUES
  (37, 't16', 'desc');
INSERT INTO
  `components_creative_component_creative_items` (`id`, `name`, `description`)
VALUES
  (38, 't17', 'desc');
INSERT INTO
  `components_creative_component_creative_items` (`id`, `name`, `description`)
VALUES
  (39, 't18', 'desc');
INSERT INTO
  `components_creative_component_creative_items` (`id`, `name`, `description`)
VALUES
  (40, '19', 'desc');
INSERT INTO
  `components_creative_component_creative_items` (`id`, `name`, `description`)
VALUES
  (41, '20', 'desc');
INSERT INTO
  `components_creative_component_creative_items` (`id`, `name`, `description`)
VALUES
  (42, '21', 'desc');
INSERT INTO
  `components_creative_component_creative_items` (`id`, `name`, `description`)
VALUES
  (43, '4', '4');
INSERT INTO
  `components_creative_component_creative_items` (`id`, `name`, `description`)
VALUES
  (44, '1', '1');
INSERT INTO
  `components_creative_component_creative_items` (`id`, `name`, `description`)
VALUES
  (45, '2', '2');
INSERT INTO
  `components_creative_component_creative_items` (`id`, `name`, `description`)
VALUES
  (46, '3', '3');
INSERT INTO
  `components_creative_component_creative_items` (`id`, `name`, `description`)
VALUES
  (47, '5', '5');
INSERT INTO
  `components_creative_component_creative_items` (`id`, `name`, `description`)
VALUES
  (48, '6', '6');
INSERT INTO
  `components_creative_component_creative_items` (`id`, `name`, `description`)
VALUES
  (49, '7', '7');
INSERT INTO
  `components_creative_component_creative_items` (`id`, `name`, `description`)
VALUES
  (50, '8', '8');
INSERT INTO
  `components_creative_component_creative_items` (`id`, `name`, `description`)
VALUES
  (51, '9', '9');
INSERT INTO
  `components_creative_component_creative_items` (`id`, `name`, `description`)
VALUES
  (52, '10', '10');
INSERT INTO
  `components_creative_component_creative_items` (`id`, `name`, `description`)
VALUES
  (53, '11', '11');
INSERT INTO
  `components_creative_component_creative_items` (`id`, `name`, `description`)
VALUES
  (54, '12', '12');

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: components_page_heads
# ------------------------------------------------------------

INSERT INTO
  `components_page_heads` (
    `id`,
    `title`,
    `description`,
    `ogType`,
    `shouldIndex`
  )
VALUES
  (
    1,
    'Creative Projects',
    'Creative projects website featuring THREE.js with React.js projects',
    'website',
    1
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: components_page_links
# ------------------------------------------------------------


# ------------------------------------------------------------
# DATA DUMP FOR TABLE: components_page_localized_heads
# ------------------------------------------------------------

INSERT INTO
  `components_page_localized_heads` (`id`, `ogType`)
VALUES
  (1, 'website');
INSERT INTO
  `components_page_localized_heads` (`id`, `ogType`)
VALUES
  (2, 'website');
INSERT INTO
  `components_page_localized_heads` (`id`, `ogType`)
VALUES
  (3, 'website');
INSERT INTO
  `components_page_localized_heads` (`id`, `ogType`)
VALUES
  (4, 'website');
INSERT INTO
  `components_page_localized_heads` (`id`, `ogType`)
VALUES
  (5, 'website');
INSERT INTO
  `components_page_localized_heads` (`id`, `ogType`)
VALUES
  (6, 'website');
INSERT INTO
  `components_page_localized_heads` (`id`, `ogType`)
VALUES
  (7, 'website');
INSERT INTO
  `components_page_localized_heads` (`id`, `ogType`)
VALUES
  (8, 'website');
INSERT INTO
  `components_page_localized_heads` (`id`, `ogType`)
VALUES
  (9, 'website');

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: components_page_localized_heads_components
# ------------------------------------------------------------

INSERT INTO
  `components_page_localized_heads_components` (
    `id`,
    `field`,
    `order`,
    `component_type`,
    `component_id`,
    `components_page_localized_head_id`
  )
VALUES
  (
    1,
    'localizedTitle',
    1,
    'components_page_localized_short_texts',
    1,
    1
  );
INSERT INTO
  `components_page_localized_heads_components` (
    `id`,
    `field`,
    `order`,
    `component_type`,
    `component_id`,
    `components_page_localized_head_id`
  )
VALUES
  (
    2,
    'localizedDescription',
    1,
    'components_page_localized_long_texts',
    1,
    1
  );
INSERT INTO
  `components_page_localized_heads_components` (
    `id`,
    `field`,
    `order`,
    `component_type`,
    `component_id`,
    `components_page_localized_head_id`
  )
VALUES
  (
    3,
    'localizedTitle',
    1,
    'components_page_localized_short_texts',
    3,
    2
  );
INSERT INTO
  `components_page_localized_heads_components` (
    `id`,
    `field`,
    `order`,
    `component_type`,
    `component_id`,
    `components_page_localized_head_id`
  )
VALUES
  (
    4,
    'localizedDescription',
    1,
    'components_page_localized_long_texts',
    2,
    2
  );
INSERT INTO
  `components_page_localized_heads_components` (
    `id`,
    `field`,
    `order`,
    `component_type`,
    `component_id`,
    `components_page_localized_head_id`
  )
VALUES
  (
    5,
    'localizedTitle',
    1,
    'components_page_localized_short_texts',
    5,
    3
  );
INSERT INTO
  `components_page_localized_heads_components` (
    `id`,
    `field`,
    `order`,
    `component_type`,
    `component_id`,
    `components_page_localized_head_id`
  )
VALUES
  (
    6,
    'localizedDescription',
    1,
    'components_page_localized_long_texts',
    3,
    3
  );
INSERT INTO
  `components_page_localized_heads_components` (
    `id`,
    `field`,
    `order`,
    `component_type`,
    `component_id`,
    `components_page_localized_head_id`
  )
VALUES
  (
    7,
    'localizedTitle',
    1,
    'components_page_localized_short_texts',
    7,
    4
  );
INSERT INTO
  `components_page_localized_heads_components` (
    `id`,
    `field`,
    `order`,
    `component_type`,
    `component_id`,
    `components_page_localized_head_id`
  )
VALUES
  (
    8,
    'localizedDescription',
    1,
    'components_page_localized_long_texts',
    4,
    4
  );
INSERT INTO
  `components_page_localized_heads_components` (
    `id`,
    `field`,
    `order`,
    `component_type`,
    `component_id`,
    `components_page_localized_head_id`
  )
VALUES
  (
    9,
    'localizedTitle',
    1,
    'components_page_localized_short_texts',
    9,
    5
  );
INSERT INTO
  `components_page_localized_heads_components` (
    `id`,
    `field`,
    `order`,
    `component_type`,
    `component_id`,
    `components_page_localized_head_id`
  )
VALUES
  (
    10,
    'localizedDescription',
    1,
    'components_page_localized_long_texts',
    5,
    5
  );
INSERT INTO
  `components_page_localized_heads_components` (
    `id`,
    `field`,
    `order`,
    `component_type`,
    `component_id`,
    `components_page_localized_head_id`
  )
VALUES
  (
    11,
    'localizedTitle',
    1,
    'components_page_localized_short_texts',
    11,
    6
  );
INSERT INTO
  `components_page_localized_heads_components` (
    `id`,
    `field`,
    `order`,
    `component_type`,
    `component_id`,
    `components_page_localized_head_id`
  )
VALUES
  (
    12,
    'localizedDescription',
    1,
    'components_page_localized_long_texts',
    6,
    6
  );
INSERT INTO
  `components_page_localized_heads_components` (
    `id`,
    `field`,
    `order`,
    `component_type`,
    `component_id`,
    `components_page_localized_head_id`
  )
VALUES
  (
    13,
    'localizedTitle',
    1,
    'components_page_localized_short_texts',
    13,
    7
  );
INSERT INTO
  `components_page_localized_heads_components` (
    `id`,
    `field`,
    `order`,
    `component_type`,
    `component_id`,
    `components_page_localized_head_id`
  )
VALUES
  (
    14,
    'localizedDescription',
    1,
    'components_page_localized_long_texts',
    7,
    7
  );
INSERT INTO
  `components_page_localized_heads_components` (
    `id`,
    `field`,
    `order`,
    `component_type`,
    `component_id`,
    `components_page_localized_head_id`
  )
VALUES
  (
    15,
    'localizedTitle',
    1,
    'components_page_localized_short_texts',
    15,
    8
  );
INSERT INTO
  `components_page_localized_heads_components` (
    `id`,
    `field`,
    `order`,
    `component_type`,
    `component_id`,
    `components_page_localized_head_id`
  )
VALUES
  (
    16,
    'localizedDescription',
    1,
    'components_page_localized_long_texts',
    8,
    8
  );
INSERT INTO
  `components_page_localized_heads_components` (
    `id`,
    `field`,
    `order`,
    `component_type`,
    `component_id`,
    `components_page_localized_head_id`
  )
VALUES
  (
    17,
    'localizedTitle',
    1,
    'components_page_localized_short_texts',
    17,
    9
  );
INSERT INTO
  `components_page_localized_heads_components` (
    `id`,
    `field`,
    `order`,
    `component_type`,
    `component_id`,
    `components_page_localized_head_id`
  )
VALUES
  (
    18,
    'localizedDescription',
    1,
    'components_page_localized_long_texts',
    9,
    9
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: components_page_localized_long_texts
# ------------------------------------------------------------

INSERT INTO
  `components_page_localized_long_texts` (`id`, `language`, `text`)
VALUES
  (
    1,
    1,
    'Stack Tower Game made with THREE.js and React.js'
  );
INSERT INTO
  `components_page_localized_long_texts` (`id`, `language`, `text`)
VALUES
  (
    2,
    1,
    'Page built with THREE.js and React.js that merges the worlds of 3D and classical DOM elements. '
  );
INSERT INTO
  `components_page_localized_long_texts` (`id`, `language`, `text`)
VALUES
  (
    3,
    1,
    'Interactive 3D Globe created with THREE.js and GLSL shaders.'
  );
INSERT INTO
  `components_page_localized_long_texts` (`id`, `language`, `text`)
VALUES
  (4, 1, 'Particle models built with THREE.js');
INSERT INTO
  `components_page_localized_long_texts` (`id`, `language`, `text`)
VALUES
  (
    5,
    1,
    'Star shower page created with 2D canvas and React.js'
  );
INSERT INTO
  `components_page_localized_long_texts` (`id`, `language`, `text`)
VALUES
  (
    6,
    1,
    'A page resembling a constellation of stars. Made with plain javaScript and 2D canvas. '
  );
INSERT INTO
  `components_page_localized_long_texts` (`id`, `language`, `text`)
VALUES
  (7, 1, '3D Spiral made with THREE.JS');
INSERT INTO
  `components_page_localized_long_texts` (`id`, `language`, `text`)
VALUES
  (8, 1, 'Infinite orbit gallery made with THREE.js');
INSERT INTO
  `components_page_localized_long_texts` (`id`, `language`, `text`)
VALUES
  (
    9,
    1,
    'Mouse follow based page built with THREE.jj'
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: components_page_localized_rich_texts
# ------------------------------------------------------------


# ------------------------------------------------------------
# DATA DUMP FOR TABLE: components_page_localized_short_texts
# ------------------------------------------------------------

INSERT INTO
  `components_page_localized_short_texts` (`id`, `text`, `language`)
VALUES
  (1, 'Stack Tower Game', 1);
INSERT INTO
  `components_page_localized_short_texts` (`id`, `text`, `language`)
VALUES
  (2, 'Stack Tower Game', 1);
INSERT INTO
  `components_page_localized_short_texts` (`id`, `text`, `language`)
VALUES
  (3, 'Flow Transition Page', 1);
INSERT INTO
  `components_page_localized_short_texts` (`id`, `text`, `language`)
VALUES
  (4, 'Flow Page', 1);
INSERT INTO
  `components_page_localized_short_texts` (`id`, `text`, `language`)
VALUES
  (5, 'Point Cloud Globe', 1);
INSERT INTO
  `components_page_localized_short_texts` (`id`, `text`, `language`)
VALUES
  (6, 'Point Cloud Globe', 1);
INSERT INTO
  `components_page_localized_short_texts` (`id`, `text`, `language`)
VALUES
  (7, 'Particles', 1);
INSERT INTO
  `components_page_localized_short_texts` (`id`, `text`, `language`)
VALUES
  (8, 'Particles', 1);
INSERT INTO
  `components_page_localized_short_texts` (`id`, `text`, `language`)
VALUES
  (9, 'Star Shower', 1);
INSERT INTO
  `components_page_localized_short_texts` (`id`, `text`, `language`)
VALUES
  (10, 'Star Shower', 1);
INSERT INTO
  `components_page_localized_short_texts` (`id`, `text`, `language`)
VALUES
  (11, 'Constellation', 1);
INSERT INTO
  `components_page_localized_short_texts` (`id`, `text`, `language`)
VALUES
  (12, 'Constellation', 1);
INSERT INTO
  `components_page_localized_short_texts` (`id`, `text`, `language`)
VALUES
  (13, 'Spiral', 1);
INSERT INTO
  `components_page_localized_short_texts` (`id`, `text`, `language`)
VALUES
  (14, 'Spiral', 1);
INSERT INTO
  `components_page_localized_short_texts` (`id`, `text`, `language`)
VALUES
  (15, 'Orbit Gallery', 1);
INSERT INTO
  `components_page_localized_short_texts` (`id`, `text`, `language`)
VALUES
  (16, 'Orbit Gallery', 1);
INSERT INTO
  `components_page_localized_short_texts` (`id`, `text`, `language`)
VALUES
  (17, 'Card Leader', 1);
INSERT INTO
  `components_page_localized_short_texts` (`id`, `text`, `language`)
VALUES
  (18, 'Card Leader', 1);

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
    3,
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
    4,
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
    5,
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
    6,
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
    7,
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
    8,
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
    9,
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
    10,
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
    11,
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
    12,
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
    13,
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
    14,
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
    15,
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
    16,
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
    17,
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
    18,
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
    19,
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
    20,
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
    21,
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
    22,
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
    23,
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
    24,
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
    25,
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
    26,
    'plugin_content_manager_configuration_content_types::application::index-page.index-page',
    '{\"uid\":\"application::index-page.index-page\",\"settings\":{\"bulkable\":true,\"filterable\":true,\"searchable\":true,\"pageSize\":10,\"mainField\":\"name\",\"defaultSortBy\":\"name\",\"defaultSortOrder\":\"ASC\"},\"metadatas\":{\"id\":{\"edit\":{},\"list\":{\"label\":\"Id\",\"searchable\":true,\"sortable\":true}},\"name\":{\"edit\":{\"label\":\"Name\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"Name\",\"searchable\":true,\"sortable\":true}},\"language\":{\"edit\":{\"label\":\"Language\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true,\"mainField\":\"name\"},\"list\":{\"label\":\"Language\",\"searchable\":false,\"sortable\":false}},\"head\":{\"edit\":{\"label\":\"Head\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"Head\",\"searchable\":false,\"sortable\":false}},\"created_at\":{\"edit\":{\"label\":\"Created_at\",\"description\":\"\",\"placeholder\":\"\",\"visible\":false,\"editable\":true},\"list\":{\"label\":\"Created_at\",\"searchable\":true,\"sortable\":true}},\"updated_at\":{\"edit\":{\"label\":\"Updated_at\",\"description\":\"\",\"placeholder\":\"\",\"visible\":false,\"editable\":true},\"list\":{\"label\":\"Updated_at\",\"searchable\":true,\"sortable\":true}}},\"layouts\":{\"list\":[\"id\",\"name\",\"language\",\"created_at\"],\"editRelations\":[\"language\"],\"edit\":[[{\"name\":\"name\",\"size\":6}],[{\"name\":\"head\",\"size\":12}]]}}',
    'object',
    '',
    ''
  );
INSERT INTO
  `core_store` (`id`, `key`, `value`, `type`, `environment`, `tag`)
VALUES
  (
    27,
    'plugin_upload_settings',
    '{\"sizeOptimization\":true,\"responsiveDimensions\":true}',
    'object',
    'production',
    ''
  );
INSERT INTO
  `core_store` (`id`, `key`, `value`, `type`, `environment`, `tag`)
VALUES
  (
    28,
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
    29,
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
    30,
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
    31,
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
    32,
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
    33,
    'plugin_content_manager_configuration_components::page.link',
    '{\"uid\":\"page.link\",\"settings\":{\"bulkable\":true,\"filterable\":true,\"searchable\":true,\"pageSize\":10,\"mainField\":\"label\",\"defaultSortBy\":\"label\",\"defaultSortOrder\":\"ASC\"},\"metadatas\":{\"id\":{\"edit\":{},\"list\":{\"label\":\"Id\",\"searchable\":false,\"sortable\":false}},\"label\":{\"edit\":{\"label\":\"Label\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"Label\",\"searchable\":true,\"sortable\":true}},\"href\":{\"edit\":{\"label\":\"Href\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"Href\",\"searchable\":true,\"sortable\":true}}},\"layouts\":{\"list\":[\"id\",\"label\",\"href\"],\"edit\":[[{\"name\":\"label\",\"size\":6},{\"name\":\"href\",\"size\":6}]],\"editRelations\":[]},\"isComponent\":true}',
    'object',
    '',
    ''
  );
INSERT INTO
  `core_store` (`id`, `key`, `value`, `type`, `environment`, `tag`)
VALUES
  (
    34,
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
    35,
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
    36,
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
    37,
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
    38,
    'model_def_page.localized-head',
    '{\"uid\":\"page.localized-head\",\"collectionName\":\"components_page_localized_heads\",\"info\":{\"name\":\"localizedHead\",\"icon\":\"atlas\"},\"options\":{\"timestamps\":false},\"attributes\":{\"localizedTitle\":{\"type\":\"component\",\"repeatable\":true,\"component\":\"page.localized-short-text\"},\"localizedDescription\":{\"type\":\"component\",\"repeatable\":true,\"component\":\"page.localized-long-text\"},\"ogType\":{\"type\":\"enumeration\",\"enum\":[\"website\"]},\"ogImage\":{\"model\":\"file\",\"via\":\"related\",\"allowedTypes\":[\"images\"],\"plugin\":\"upload\",\"required\":false}}}',
    'object',
    NULL,
    NULL
  );
INSERT INTO
  `core_store` (`id`, `key`, `value`, `type`, `environment`, `tag`)
VALUES
  (
    39,
    'plugin_content_manager_configuration_components::page.localized-head',
    '{\"uid\":\"page.localized-head\",\"settings\":{\"bulkable\":true,\"filterable\":true,\"searchable\":true,\"pageSize\":10,\"mainField\":\"id\",\"defaultSortBy\":\"id\",\"defaultSortOrder\":\"ASC\"},\"metadatas\":{\"id\":{\"edit\":{},\"list\":{\"label\":\"Id\",\"searchable\":false,\"sortable\":false}},\"localizedTitle\":{\"edit\":{\"label\":\"LocalizedTitle\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"LocalizedTitle\",\"searchable\":false,\"sortable\":false}},\"localizedDescription\":{\"edit\":{\"label\":\"LocalizedDescription\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"LocalizedDescription\",\"searchable\":false,\"sortable\":false}},\"ogType\":{\"edit\":{\"label\":\"OgType\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"OgType\",\"searchable\":true,\"sortable\":true}},\"ogImage\":{\"edit\":{\"label\":\"OgImage\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"OgImage\",\"searchable\":false,\"sortable\":false}}},\"layouts\":{\"list\":[\"id\",\"ogType\",\"ogImage\"],\"edit\":[[{\"name\":\"localizedTitle\",\"size\":12}],[{\"name\":\"localizedDescription\",\"size\":12}],[{\"name\":\"ogType\",\"size\":6},{\"name\":\"ogImage\",\"size\":6}]],\"editRelations\":[]},\"isComponent\":true}',
    'object',
    '',
    ''
  );
INSERT INTO
  `core_store` (`id`, `key`, `value`, `type`, `environment`, `tag`)
VALUES
  (
    40,
    'model_def_application::project.project',
    '{\"uid\":\"application::project.project\",\"collectionName\":\"projects\",\"kind\":\"collectionType\",\"info\":{\"name\":\"project\",\"description\":\"\"},\"options\":{\"increments\":true,\"timestamps\":[\"created_at\",\"updated_at\"],\"draftAndPublish\":false},\"attributes\":{\"localizedHead\":{\"type\":\"component\",\"repeatable\":false,\"component\":\"page.localized-head\"},\"localizedName\":{\"type\":\"component\",\"repeatable\":true,\"component\":\"page.localized-short-text\"},\"urlSlug\":{\"type\":\"uid\"},\"creativeItems\":{\"type\":\"component\",\"repeatable\":true,\"component\":\"creative-component.creative-item\"},\"created_by\":{\"model\":\"user\",\"plugin\":\"admin\",\"configurable\":false,\"writable\":false,\"private\":true},\"updated_by\":{\"model\":\"user\",\"plugin\":\"admin\",\"configurable\":false,\"writable\":false,\"private\":true}}}',
    'object',
    NULL,
    NULL
  );
INSERT INTO
  `core_store` (`id`, `key`, `value`, `type`, `environment`, `tag`)
VALUES
  (
    41,
    'plugin_content_manager_configuration_content_types::application::project.project',
    '{\"uid\":\"application::project.project\",\"settings\":{\"bulkable\":true,\"filterable\":true,\"searchable\":true,\"pageSize\":10,\"mainField\":\"id\",\"defaultSortBy\":\"id\",\"defaultSortOrder\":\"ASC\"},\"metadatas\":{\"id\":{\"edit\":{},\"list\":{\"label\":\"Id\",\"searchable\":true,\"sortable\":true}},\"localizedHead\":{\"edit\":{\"label\":\"LocalizedHead\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"LocalizedHead\",\"searchable\":false,\"sortable\":false}},\"localizedName\":{\"edit\":{\"label\":\"LocalizedName\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"LocalizedName\",\"searchable\":false,\"sortable\":false}},\"urlSlug\":{\"edit\":{\"label\":\"UrlSlug\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"UrlSlug\",\"searchable\":true,\"sortable\":true}},\"creativeItems\":{\"edit\":{\"label\":\"CreativeItems\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"CreativeItems\",\"searchable\":false,\"sortable\":false}},\"created_at\":{\"edit\":{\"label\":\"Created_at\",\"description\":\"\",\"placeholder\":\"\",\"visible\":false,\"editable\":true},\"list\":{\"label\":\"Created_at\",\"searchable\":true,\"sortable\":true}},\"updated_at\":{\"edit\":{\"label\":\"Updated_at\",\"description\":\"\",\"placeholder\":\"\",\"visible\":false,\"editable\":true},\"list\":{\"label\":\"Updated_at\",\"searchable\":true,\"sortable\":true}}},\"layouts\":{\"list\":[\"id\",\"urlSlug\",\"created_at\",\"updated_at\"],\"edit\":[[{\"name\":\"localizedHead\",\"size\":12}],[{\"name\":\"localizedName\",\"size\":12}],[{\"name\":\"urlSlug\",\"size\":6}],[{\"name\":\"creativeItems\",\"size\":12}]],\"editRelations\":[]}}',
    'object',
    '',
    ''
  );
INSERT INTO
  `core_store` (`id`, `key`, `value`, `type`, `environment`, `tag`)
VALUES
  (
    42,
    'model_def_application::flow-page.flow-page',
    '{\"uid\":\"application::flow-page.flow-page\",\"collectionName\":\"flow_pages\",\"kind\":\"collectionType\",\"info\":{\"name\":\"flowPage\",\"description\":\"\"},\"options\":{\"increments\":true,\"timestamps\":[\"created_at\",\"updated_at\"],\"draftAndPublish\":false},\"attributes\":{\"name\":{\"type\":\"string\"},\"language\":{\"model\":\"language\"},\"flowItems\":{\"type\":\"component\",\"repeatable\":true,\"component\":\"creative-component.creative-item\"},\"asideDescription\":{\"type\":\"richtext\"},\"slideImages\":{\"collection\":\"file\",\"via\":\"related\",\"allowedTypes\":[\"images\"],\"plugin\":\"upload\",\"required\":false},\"created_by\":{\"model\":\"user\",\"plugin\":\"admin\",\"configurable\":false,\"writable\":false,\"private\":true},\"updated_by\":{\"model\":\"user\",\"plugin\":\"admin\",\"configurable\":false,\"writable\":false,\"private\":true}}}',
    'object',
    NULL,
    NULL
  );
INSERT INTO
  `core_store` (`id`, `key`, `value`, `type`, `environment`, `tag`)
VALUES
  (
    43,
    'plugin_content_manager_configuration_content_types::application::flow-page.flow-page',
    '{\"uid\":\"application::flow-page.flow-page\",\"settings\":{\"bulkable\":true,\"filterable\":true,\"searchable\":true,\"pageSize\":10,\"mainField\":\"name\",\"defaultSortBy\":\"name\",\"defaultSortOrder\":\"ASC\"},\"metadatas\":{\"id\":{\"edit\":{},\"list\":{\"label\":\"Id\",\"searchable\":true,\"sortable\":true}},\"name\":{\"edit\":{\"label\":\"Name\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"Name\",\"searchable\":true,\"sortable\":true}},\"language\":{\"edit\":{\"label\":\"Language\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true,\"mainField\":\"name\"},\"list\":{\"label\":\"Language\",\"searchable\":false,\"sortable\":false}},\"flowItems\":{\"edit\":{\"label\":\"FlowItems\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"FlowItems\",\"searchable\":false,\"sortable\":false}},\"asideDescription\":{\"edit\":{\"label\":\"AsideDescription\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"AsideDescription\",\"searchable\":false,\"sortable\":false}},\"slideImages\":{\"edit\":{\"label\":\"SlideImages\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"SlideImages\",\"searchable\":false,\"sortable\":false}},\"created_at\":{\"edit\":{\"label\":\"Created_at\",\"description\":\"\",\"placeholder\":\"\",\"visible\":false,\"editable\":true},\"list\":{\"label\":\"Created_at\",\"searchable\":true,\"sortable\":true}},\"updated_at\":{\"edit\":{\"label\":\"Updated_at\",\"description\":\"\",\"placeholder\":\"\",\"visible\":false,\"editable\":true},\"list\":{\"label\":\"Updated_at\",\"searchable\":true,\"sortable\":true}}},\"layouts\":{\"list\":[\"id\",\"name\",\"language\",\"created_at\"],\"edit\":[[{\"name\":\"name\",\"size\":6}],[{\"name\":\"asideDescription\",\"size\":12}],[{\"name\":\"flowItems\",\"size\":12}],[{\"name\":\"slideImages\",\"size\":6}]],\"editRelations\":[\"language\"]}}',
    'object',
    '',
    ''
  );
INSERT INTO
  `core_store` (`id`, `key`, `value`, `type`, `environment`, `tag`)
VALUES
  (
    44,
    'model_def_creative-component.creative-item',
    '{\"uid\":\"creative-component.creative-item\",\"collectionName\":\"components_creative_component_creative_items\",\"info\":{\"name\":\"creativeItem\",\"icon\":\"address-book\"},\"options\":{\"timestamps\":false},\"attributes\":{\"name\":{\"type\":\"string\"},\"image\":{\"model\":\"file\",\"via\":\"related\",\"allowedTypes\":[\"images\"],\"plugin\":\"upload\",\"required\":false},\"description\":{\"type\":\"richtext\"}}}',
    'object',
    NULL,
    NULL
  );
INSERT INTO
  `core_store` (`id`, `key`, `value`, `type`, `environment`, `tag`)
VALUES
  (
    45,
    'plugin_content_manager_configuration_components::creative-component.creative-item',
    '{\"uid\":\"creative-component.creative-item\",\"settings\":{\"bulkable\":true,\"filterable\":true,\"searchable\":true,\"pageSize\":10,\"mainField\":\"name\",\"defaultSortBy\":\"name\",\"defaultSortOrder\":\"ASC\"},\"metadatas\":{\"id\":{\"edit\":{},\"list\":{\"label\":\"Id\",\"searchable\":false,\"sortable\":false}},\"name\":{\"edit\":{\"label\":\"Name\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"Name\",\"searchable\":true,\"sortable\":true}},\"image\":{\"edit\":{\"label\":\"Image\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"Image\",\"searchable\":false,\"sortable\":false}},\"description\":{\"edit\":{\"label\":\"Description\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"Description\",\"searchable\":false,\"sortable\":false}}},\"layouts\":{\"list\":[\"id\",\"name\",\"image\"],\"edit\":[[{\"name\":\"name\",\"size\":6},{\"name\":\"image\",\"size\":6}],[{\"name\":\"description\",\"size\":12}]],\"editRelations\":[]},\"isComponent\":true}',
    'object',
    '',
    ''
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: flow_pages
# ------------------------------------------------------------

INSERT INTO
  `flow_pages` (
    `id`,
    `name`,
    `language`,
    `created_by`,
    `updated_by`,
    `created_at`,
    `updated_at`,
    `asideDescription`
  )
VALUES
  (
    1,
    'flowPage (en-US)',
    1,
    1,
    1,
    '2021-05-04 17:49:44',
    '2021-05-16 14:37:47',
    '***2021***\n\nWebsite created using ThreeJS. Design and experience are partly based on *[Kacper Chlebowicz site](https://kacper.ch/)*.'
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: flow_pages_components
# ------------------------------------------------------------

INSERT INTO
  `flow_pages_components` (
    `id`,
    `field`,
    `order`,
    `component_type`,
    `component_id`,
    `flow_page_id`
  )
VALUES
  (
    1,
    'flowItem',
    1,
    'components_creative_component_creative_items',
    1,
    1
  );
INSERT INTO
  `flow_pages_components` (
    `id`,
    `field`,
    `order`,
    `component_type`,
    `component_id`,
    `flow_page_id`
  )
VALUES
  (
    2,
    'flowItem',
    2,
    'components_creative_component_creative_items',
    2,
    1
  );
INSERT INTO
  `flow_pages_components` (
    `id`,
    `field`,
    `order`,
    `component_type`,
    `component_id`,
    `flow_page_id`
  )
VALUES
  (
    3,
    'flowItem',
    3,
    'components_creative_component_creative_items',
    3,
    1
  );
INSERT INTO
  `flow_pages_components` (
    `id`,
    `field`,
    `order`,
    `component_type`,
    `component_id`,
    `flow_page_id`
  )
VALUES
  (
    4,
    'flowItems',
    1,
    'components_creative_component_creative_items',
    4,
    1
  );
INSERT INTO
  `flow_pages_components` (
    `id`,
    `field`,
    `order`,
    `component_type`,
    `component_id`,
    `flow_page_id`
  )
VALUES
  (
    5,
    'flowItems',
    2,
    'components_creative_component_creative_items',
    5,
    1
  );
INSERT INTO
  `flow_pages_components` (
    `id`,
    `field`,
    `order`,
    `component_type`,
    `component_id`,
    `flow_page_id`
  )
VALUES
  (
    6,
    'flowItems',
    3,
    'components_creative_component_creative_items',
    6,
    1
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: index_pages
# ------------------------------------------------------------

INSERT INTO
  `index_pages` (
    `id`,
    `name`,
    `language`,
    `created_by`,
    `updated_by`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    1,
    'indexPage (en-US)',
    1,
    1,
    1,
    '2021-03-27 18:55:20',
    '2021-05-03 23:19:27'
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
    'english (en-US)',
    'en-US',
    1,
    1,
    '2021-03-27 18:55:12',
    '2021-03-27 18:55:12'
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: projects
# ------------------------------------------------------------

INSERT INTO
  `projects` (
    `id`,
    `urlSlug`,
    `created_by`,
    `updated_by`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    1,
    'stack-tower',
    1,
    1,
    '2021-05-03 21:11:03',
    '2021-05-30 21:40:24'
  );
INSERT INTO
  `projects` (
    `id`,
    `urlSlug`,
    `created_by`,
    `updated_by`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    2,
    'flow',
    1,
    1,
    '2021-05-04 17:59:07',
    '2021-05-30 21:40:49'
  );
INSERT INTO
  `projects` (
    `id`,
    `urlSlug`,
    `created_by`,
    `updated_by`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    3,
    'globe',
    1,
    1,
    '2021-05-18 21:09:50',
    '2021-05-30 21:41:14'
  );
INSERT INTO
  `projects` (
    `id`,
    `urlSlug`,
    `created_by`,
    `updated_by`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    4,
    'particles',
    1,
    1,
    '2021-06-02 22:36:47',
    '2021-06-13 22:18:12'
  );
INSERT INTO
  `projects` (
    `id`,
    `urlSlug`,
    `created_by`,
    `updated_by`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    5,
    'star-shower',
    1,
    1,
    '2021-07-21 20:44:23',
    '2021-07-21 20:44:23'
  );
INSERT INTO
  `projects` (
    `id`,
    `urlSlug`,
    `created_by`,
    `updated_by`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    6,
    'constellation',
    1,
    1,
    '2021-07-27 10:24:18',
    '2021-07-27 10:24:18'
  );
INSERT INTO
  `projects` (
    `id`,
    `urlSlug`,
    `created_by`,
    `updated_by`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    7,
    'spiral',
    1,
    1,
    '2021-08-06 21:33:21',
    '2021-08-07 13:47:18'
  );
INSERT INTO
  `projects` (
    `id`,
    `urlSlug`,
    `created_by`,
    `updated_by`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    8,
    'orbit-gallery',
    1,
    1,
    '2021-08-25 09:30:18',
    '2021-08-30 22:40:40'
  );
INSERT INTO
  `projects` (
    `id`,
    `urlSlug`,
    `created_by`,
    `updated_by`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    9,
    'card-leader',
    1,
    1,
    '2021-08-31 19:28:39',
    '2021-08-31 19:37:38'
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: projects_components
# ------------------------------------------------------------

INSERT INTO
  `projects_components` (
    `id`,
    `field`,
    `order`,
    `component_type`,
    `component_id`,
    `project_id`
  )
VALUES
  (
    1,
    'localizedHead',
    1,
    'components_page_localized_heads',
    1,
    1
  );
INSERT INTO
  `projects_components` (
    `id`,
    `field`,
    `order`,
    `component_type`,
    `component_id`,
    `project_id`
  )
VALUES
  (
    2,
    'localizedName',
    1,
    'components_page_localized_short_texts',
    2,
    1
  );
INSERT INTO
  `projects_components` (
    `id`,
    `field`,
    `order`,
    `component_type`,
    `component_id`,
    `project_id`
  )
VALUES
  (
    3,
    'localizedHead',
    1,
    'components_page_localized_heads',
    2,
    2
  );
INSERT INTO
  `projects_components` (
    `id`,
    `field`,
    `order`,
    `component_type`,
    `component_id`,
    `project_id`
  )
VALUES
  (
    4,
    'localizedName',
    1,
    'components_page_localized_short_texts',
    4,
    2
  );
INSERT INTO
  `projects_components` (
    `id`,
    `field`,
    `order`,
    `component_type`,
    `component_id`,
    `project_id`
  )
VALUES
  (
    5,
    'localizedHead',
    1,
    'components_page_localized_heads',
    3,
    3
  );
INSERT INTO
  `projects_components` (
    `id`,
    `field`,
    `order`,
    `component_type`,
    `component_id`,
    `project_id`
  )
VALUES
  (
    6,
    'localizedName',
    1,
    'components_page_localized_short_texts',
    6,
    3
  );
INSERT INTO
  `projects_components` (
    `id`,
    `field`,
    `order`,
    `component_type`,
    `component_id`,
    `project_id`
  )
VALUES
  (
    7,
    'localizedHead',
    1,
    'components_page_localized_heads',
    4,
    4
  );
INSERT INTO
  `projects_components` (
    `id`,
    `field`,
    `order`,
    `component_type`,
    `component_id`,
    `project_id`
  )
VALUES
  (
    8,
    'localizedName',
    1,
    'components_page_localized_short_texts',
    8,
    4
  );
INSERT INTO
  `projects_components` (
    `id`,
    `field`,
    `order`,
    `component_type`,
    `component_id`,
    `project_id`
  )
VALUES
  (
    9,
    'creativeItems',
    2,
    'components_creative_component_creative_items',
    7,
    4
  );
INSERT INTO
  `projects_components` (
    `id`,
    `field`,
    `order`,
    `component_type`,
    `component_id`,
    `project_id`
  )
VALUES
  (
    10,
    'creativeItems',
    1,
    'components_creative_component_creative_items',
    8,
    4
  );
INSERT INTO
  `projects_components` (
    `id`,
    `field`,
    `order`,
    `component_type`,
    `component_id`,
    `project_id`
  )
VALUES
  (
    11,
    'creativeItems',
    3,
    'components_creative_component_creative_items',
    9,
    4
  );
INSERT INTO
  `projects_components` (
    `id`,
    `field`,
    `order`,
    `component_type`,
    `component_id`,
    `project_id`
  )
VALUES
  (
    12,
    'localizedHead',
    1,
    'components_page_localized_heads',
    5,
    5
  );
INSERT INTO
  `projects_components` (
    `id`,
    `field`,
    `order`,
    `component_type`,
    `component_id`,
    `project_id`
  )
VALUES
  (
    13,
    'localizedName',
    1,
    'components_page_localized_short_texts',
    10,
    5
  );
INSERT INTO
  `projects_components` (
    `id`,
    `field`,
    `order`,
    `component_type`,
    `component_id`,
    `project_id`
  )
VALUES
  (
    14,
    'localizedHead',
    1,
    'components_page_localized_heads',
    6,
    6
  );
INSERT INTO
  `projects_components` (
    `id`,
    `field`,
    `order`,
    `component_type`,
    `component_id`,
    `project_id`
  )
VALUES
  (
    15,
    'localizedName',
    1,
    'components_page_localized_short_texts',
    12,
    6
  );
INSERT INTO
  `projects_components` (
    `id`,
    `field`,
    `order`,
    `component_type`,
    `component_id`,
    `project_id`
  )
VALUES
  (
    16,
    'localizedHead',
    1,
    'components_page_localized_heads',
    7,
    7
  );
INSERT INTO
  `projects_components` (
    `id`,
    `field`,
    `order`,
    `component_type`,
    `component_id`,
    `project_id`
  )
VALUES
  (
    17,
    'localizedName',
    1,
    'components_page_localized_short_texts',
    14,
    7
  );
INSERT INTO
  `projects_components` (
    `id`,
    `field`,
    `order`,
    `component_type`,
    `component_id`,
    `project_id`
  )
VALUES
  (
    19,
    'creativeItems',
    1,
    'components_creative_component_creative_items',
    11,
    7
  );
INSERT INTO
  `projects_components` (
    `id`,
    `field`,
    `order`,
    `component_type`,
    `component_id`,
    `project_id`
  )
VALUES
  (
    20,
    'creativeItems',
    2,
    'components_creative_component_creative_items',
    12,
    7
  );
INSERT INTO
  `projects_components` (
    `id`,
    `field`,
    `order`,
    `component_type`,
    `component_id`,
    `project_id`
  )
VALUES
  (
    21,
    'creativeItems',
    4,
    'components_creative_component_creative_items',
    13,
    7
  );
INSERT INTO
  `projects_components` (
    `id`,
    `field`,
    `order`,
    `component_type`,
    `component_id`,
    `project_id`
  )
VALUES
  (
    22,
    'creativeItems',
    3,
    'components_creative_component_creative_items',
    14,
    7
  );
INSERT INTO
  `projects_components` (
    `id`,
    `field`,
    `order`,
    `component_type`,
    `component_id`,
    `project_id`
  )
VALUES
  (
    23,
    'creativeItems',
    5,
    'components_creative_component_creative_items',
    15,
    7
  );
INSERT INTO
  `projects_components` (
    `id`,
    `field`,
    `order`,
    `component_type`,
    `component_id`,
    `project_id`
  )
VALUES
  (
    24,
    'creativeItems',
    6,
    'components_creative_component_creative_items',
    16,
    7
  );
INSERT INTO
  `projects_components` (
    `id`,
    `field`,
    `order`,
    `component_type`,
    `component_id`,
    `project_id`
  )
VALUES
  (
    25,
    'creativeItems',
    7,
    'components_creative_component_creative_items',
    17,
    7
  );
INSERT INTO
  `projects_components` (
    `id`,
    `field`,
    `order`,
    `component_type`,
    `component_id`,
    `project_id`
  )
VALUES
  (
    26,
    'creativeItems',
    9,
    'components_creative_component_creative_items',
    18,
    7
  );
INSERT INTO
  `projects_components` (
    `id`,
    `field`,
    `order`,
    `component_type`,
    `component_id`,
    `project_id`
  )
VALUES
  (
    27,
    'creativeItems',
    8,
    'components_creative_component_creative_items',
    19,
    7
  );
INSERT INTO
  `projects_components` (
    `id`,
    `field`,
    `order`,
    `component_type`,
    `component_id`,
    `project_id`
  )
VALUES
  (
    28,
    'creativeItems',
    11,
    'components_creative_component_creative_items',
    20,
    7
  );
INSERT INTO
  `projects_components` (
    `id`,
    `field`,
    `order`,
    `component_type`,
    `component_id`,
    `project_id`
  )
VALUES
  (
    29,
    'creativeItems',
    10,
    'components_creative_component_creative_items',
    21,
    7
  );
INSERT INTO
  `projects_components` (
    `id`,
    `field`,
    `order`,
    `component_type`,
    `component_id`,
    `project_id`
  )
VALUES
  (
    30,
    'localizedHead',
    1,
    'components_page_localized_heads',
    8,
    8
  );
INSERT INTO
  `projects_components` (
    `id`,
    `field`,
    `order`,
    `component_type`,
    `component_id`,
    `project_id`
  )
VALUES
  (
    31,
    'localizedName',
    1,
    'components_page_localized_short_texts',
    16,
    8
  );
INSERT INTO
  `projects_components` (
    `id`,
    `field`,
    `order`,
    `component_type`,
    `component_id`,
    `project_id`
  )
VALUES
  (
    32,
    'creativeItems',
    1,
    'components_creative_component_creative_items',
    22,
    8
  );
INSERT INTO
  `projects_components` (
    `id`,
    `field`,
    `order`,
    `component_type`,
    `component_id`,
    `project_id`
  )
VALUES
  (
    33,
    'creativeItems',
    2,
    'components_creative_component_creative_items',
    23,
    8
  );
INSERT INTO
  `projects_components` (
    `id`,
    `field`,
    `order`,
    `component_type`,
    `component_id`,
    `project_id`
  )
VALUES
  (
    34,
    'creativeItems',
    3,
    'components_creative_component_creative_items',
    24,
    8
  );
INSERT INTO
  `projects_components` (
    `id`,
    `field`,
    `order`,
    `component_type`,
    `component_id`,
    `project_id`
  )
VALUES
  (
    35,
    'creativeItems',
    4,
    'components_creative_component_creative_items',
    25,
    8
  );
INSERT INTO
  `projects_components` (
    `id`,
    `field`,
    `order`,
    `component_type`,
    `component_id`,
    `project_id`
  )
VALUES
  (
    36,
    'creativeItems',
    5,
    'components_creative_component_creative_items',
    26,
    8
  );
INSERT INTO
  `projects_components` (
    `id`,
    `field`,
    `order`,
    `component_type`,
    `component_id`,
    `project_id`
  )
VALUES
  (
    37,
    'creativeItems',
    6,
    'components_creative_component_creative_items',
    27,
    8
  );
INSERT INTO
  `projects_components` (
    `id`,
    `field`,
    `order`,
    `component_type`,
    `component_id`,
    `project_id`
  )
VALUES
  (
    38,
    'creativeItems',
    7,
    'components_creative_component_creative_items',
    28,
    8
  );
INSERT INTO
  `projects_components` (
    `id`,
    `field`,
    `order`,
    `component_type`,
    `component_id`,
    `project_id`
  )
VALUES
  (
    39,
    'creativeItems',
    8,
    'components_creative_component_creative_items',
    29,
    8
  );
INSERT INTO
  `projects_components` (
    `id`,
    `field`,
    `order`,
    `component_type`,
    `component_id`,
    `project_id`
  )
VALUES
  (
    40,
    'creativeItems',
    9,
    'components_creative_component_creative_items',
    30,
    8
  );
INSERT INTO
  `projects_components` (
    `id`,
    `field`,
    `order`,
    `component_type`,
    `component_id`,
    `project_id`
  )
VALUES
  (
    41,
    'creativeItems',
    10,
    'components_creative_component_creative_items',
    31,
    8
  );
INSERT INTO
  `projects_components` (
    `id`,
    `field`,
    `order`,
    `component_type`,
    `component_id`,
    `project_id`
  )
VALUES
  (
    42,
    'creativeItems',
    11,
    'components_creative_component_creative_items',
    32,
    8
  );
INSERT INTO
  `projects_components` (
    `id`,
    `field`,
    `order`,
    `component_type`,
    `component_id`,
    `project_id`
  )
VALUES
  (
    43,
    'creativeItems',
    12,
    'components_creative_component_creative_items',
    33,
    8
  );
INSERT INTO
  `projects_components` (
    `id`,
    `field`,
    `order`,
    `component_type`,
    `component_id`,
    `project_id`
  )
VALUES
  (
    44,
    'creativeItems',
    13,
    'components_creative_component_creative_items',
    34,
    8
  );
INSERT INTO
  `projects_components` (
    `id`,
    `field`,
    `order`,
    `component_type`,
    `component_id`,
    `project_id`
  )
VALUES
  (
    45,
    'creativeItems',
    14,
    'components_creative_component_creative_items',
    35,
    8
  );
INSERT INTO
  `projects_components` (
    `id`,
    `field`,
    `order`,
    `component_type`,
    `component_id`,
    `project_id`
  )
VALUES
  (
    46,
    'creativeItems',
    15,
    'components_creative_component_creative_items',
    36,
    8
  );
INSERT INTO
  `projects_components` (
    `id`,
    `field`,
    `order`,
    `component_type`,
    `component_id`,
    `project_id`
  )
VALUES
  (
    47,
    'creativeItems',
    16,
    'components_creative_component_creative_items',
    37,
    8
  );
INSERT INTO
  `projects_components` (
    `id`,
    `field`,
    `order`,
    `component_type`,
    `component_id`,
    `project_id`
  )
VALUES
  (
    48,
    'creativeItems',
    17,
    'components_creative_component_creative_items',
    38,
    8
  );
INSERT INTO
  `projects_components` (
    `id`,
    `field`,
    `order`,
    `component_type`,
    `component_id`,
    `project_id`
  )
VALUES
  (
    49,
    'creativeItems',
    18,
    'components_creative_component_creative_items',
    39,
    8
  );
INSERT INTO
  `projects_components` (
    `id`,
    `field`,
    `order`,
    `component_type`,
    `component_id`,
    `project_id`
  )
VALUES
  (
    50,
    'creativeItems',
    19,
    'components_creative_component_creative_items',
    40,
    8
  );
INSERT INTO
  `projects_components` (
    `id`,
    `field`,
    `order`,
    `component_type`,
    `component_id`,
    `project_id`
  )
VALUES
  (
    51,
    'creativeItems',
    20,
    'components_creative_component_creative_items',
    41,
    8
  );
INSERT INTO
  `projects_components` (
    `id`,
    `field`,
    `order`,
    `component_type`,
    `component_id`,
    `project_id`
  )
VALUES
  (
    52,
    'creativeItems',
    21,
    'components_creative_component_creative_items',
    42,
    8
  );
INSERT INTO
  `projects_components` (
    `id`,
    `field`,
    `order`,
    `component_type`,
    `component_id`,
    `project_id`
  )
VALUES
  (
    53,
    'localizedHead',
    1,
    'components_page_localized_heads',
    9,
    9
  );
INSERT INTO
  `projects_components` (
    `id`,
    `field`,
    `order`,
    `component_type`,
    `component_id`,
    `project_id`
  )
VALUES
  (
    54,
    'localizedName',
    1,
    'components_page_localized_short_texts',
    18,
    9
  );
INSERT INTO
  `projects_components` (
    `id`,
    `field`,
    `order`,
    `component_type`,
    `component_id`,
    `project_id`
  )
VALUES
  (
    55,
    'creativeItems',
    1,
    'components_creative_component_creative_items',
    43,
    9
  );
INSERT INTO
  `projects_components` (
    `id`,
    `field`,
    `order`,
    `component_type`,
    `component_id`,
    `project_id`
  )
VALUES
  (
    56,
    'creativeItems',
    2,
    'components_creative_component_creative_items',
    44,
    9
  );
INSERT INTO
  `projects_components` (
    `id`,
    `field`,
    `order`,
    `component_type`,
    `component_id`,
    `project_id`
  )
VALUES
  (
    57,
    'creativeItems',
    3,
    'components_creative_component_creative_items',
    45,
    9
  );
INSERT INTO
  `projects_components` (
    `id`,
    `field`,
    `order`,
    `component_type`,
    `component_id`,
    `project_id`
  )
VALUES
  (
    58,
    'creativeItems',
    4,
    'components_creative_component_creative_items',
    46,
    9
  );
INSERT INTO
  `projects_components` (
    `id`,
    `field`,
    `order`,
    `component_type`,
    `component_id`,
    `project_id`
  )
VALUES
  (
    59,
    'creativeItems',
    5,
    'components_creative_component_creative_items',
    47,
    9
  );
INSERT INTO
  `projects_components` (
    `id`,
    `field`,
    `order`,
    `component_type`,
    `component_id`,
    `project_id`
  )
VALUES
  (
    60,
    'creativeItems',
    6,
    'components_creative_component_creative_items',
    48,
    9
  );
INSERT INTO
  `projects_components` (
    `id`,
    `field`,
    `order`,
    `component_type`,
    `component_id`,
    `project_id`
  )
VALUES
  (
    61,
    'creativeItems',
    7,
    'components_creative_component_creative_items',
    49,
    9
  );
INSERT INTO
  `projects_components` (
    `id`,
    `field`,
    `order`,
    `component_type`,
    `component_id`,
    `project_id`
  )
VALUES
  (
    62,
    'creativeItems',
    8,
    'components_creative_component_creative_items',
    50,
    9
  );
INSERT INTO
  `projects_components` (
    `id`,
    `field`,
    `order`,
    `component_type`,
    `component_id`,
    `project_id`
  )
VALUES
  (
    63,
    'creativeItems',
    9,
    'components_creative_component_creative_items',
    51,
    9
  );
INSERT INTO
  `projects_components` (
    `id`,
    `field`,
    `order`,
    `component_type`,
    `component_id`,
    `project_id`
  )
VALUES
  (
    64,
    'creativeItems',
    10,
    'components_creative_component_creative_items',
    52,
    9
  );
INSERT INTO
  `projects_components` (
    `id`,
    `field`,
    `order`,
    `component_type`,
    `component_id`,
    `project_id`
  )
VALUES
  (
    65,
    'creativeItems',
    11,
    'components_creative_component_creative_items',
    53,
    9
  );
INSERT INTO
  `projects_components` (
    `id`,
    `field`,
    `order`,
    `component_type`,
    `component_id`,
    `project_id`
  )
VALUES
  (
    66,
    'creativeItems',
    12,
    'components_creative_component_creative_items',
    54,
    9
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
    '$2b$10$oXH8XqCTNCXvHZjgfGT2Lu49gzy763SWRLDAx3A8VfUxGz3d8sVZu',
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
    'plugins::content-manager.explorer.create',
    'application::language.language',
    '[\"name\",\"code\"]',
    '[]',
    2,
    '2021-03-27 18:51:16',
    '2021-03-27 18:51:16'
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
    'plugins::content-manager.explorer.read',
    'application::language.language',
    '[\"name\",\"code\"]',
    '[]',
    2,
    '2021-03-27 18:51:16',
    '2021-03-27 18:51:16'
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
    'plugins::content-manager.explorer.update',
    'application::language.language',
    '[\"name\",\"code\"]',
    '[]',
    2,
    '2021-03-27 18:51:16',
    '2021-03-27 18:51:16'
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
    'plugins::content-manager.explorer.delete',
    'application::language.language',
    NULL,
    '[]',
    2,
    '2021-03-27 18:51:16',
    '2021-03-27 18:51:16'
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
    'plugins::upload.read',
    NULL,
    NULL,
    '[]',
    2,
    '2021-03-27 18:51:16',
    '2021-03-27 18:51:16'
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
    'plugins::upload.assets.download',
    NULL,
    NULL,
    '[]',
    2,
    '2021-03-27 18:51:16',
    '2021-03-27 18:51:16'
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
    2,
    '2021-03-27 18:51:16',
    '2021-03-27 18:51:16'
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
    '[]',
    2,
    '2021-03-27 18:51:16',
    '2021-03-27 18:51:16'
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
    'plugins::upload.assets.copy-link',
    NULL,
    NULL,
    '[]',
    2,
    '2021-03-27 18:51:16',
    '2021-03-27 18:51:16'
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
    'plugins::content-manager.explorer.create',
    'application::language.language',
    '[\"name\",\"code\"]',
    '[\"admin::is-creator\"]',
    3,
    '2021-03-27 18:51:17',
    '2021-03-27 18:51:17'
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
    'plugins::content-manager.explorer.read',
    'application::language.language',
    '[\"name\",\"code\"]',
    '[\"admin::is-creator\"]',
    3,
    '2021-03-27 18:51:17',
    '2021-03-27 18:51:17'
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
    'plugins::content-manager.explorer.update',
    'application::language.language',
    '[\"name\",\"code\"]',
    '[\"admin::is-creator\"]',
    3,
    '2021-03-27 18:51:17',
    '2021-03-27 18:51:17'
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
    'plugins::content-manager.explorer.delete',
    'application::language.language',
    NULL,
    '[\"admin::is-creator\"]',
    3,
    '2021-03-27 18:51:17',
    '2021-03-27 18:51:17'
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
    'plugins::upload.read',
    NULL,
    NULL,
    '[\"admin::is-creator\"]',
    3,
    '2021-03-27 18:51:17',
    '2021-03-27 18:51:17'
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
    'plugins::upload.assets.create',
    NULL,
    NULL,
    '[]',
    3,
    '2021-03-27 18:51:17',
    '2021-03-27 18:51:17'
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
    'plugins::upload.assets.update',
    NULL,
    NULL,
    '[\"admin::is-creator\"]',
    3,
    '2021-03-27 18:51:17',
    '2021-03-27 18:51:17'
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
    'plugins::upload.assets.download',
    NULL,
    NULL,
    '[]',
    3,
    '2021-03-27 18:51:17',
    '2021-03-27 18:51:17'
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
    'plugins::upload.assets.copy-link',
    NULL,
    NULL,
    '[]',
    3,
    '2021-03-27 18:51:17',
    '2021-03-27 18:51:17'
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
    'plugins::content-manager.explorer.create',
    'application::language.language',
    '[\"name\",\"code\"]',
    '[]',
    1,
    '2021-03-27 18:51:17',
    '2021-03-27 18:51:17'
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
    'plugins::content-manager.explorer.create',
    'plugins::users-permissions.user',
    '[\"username\",\"email\",\"provider\",\"password\",\"resetPasswordToken\",\"confirmationToken\",\"confirmed\",\"blocked\",\"role\"]',
    '[]',
    1,
    '2021-03-27 18:51:17',
    '2021-03-27 18:51:17'
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
    'plugins::content-manager.explorer.read',
    'application::language.language',
    '[\"name\",\"code\"]',
    '[]',
    1,
    '2021-03-27 18:51:17',
    '2021-03-27 18:51:17'
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
    'plugins::content-manager.explorer.read',
    'plugins::users-permissions.user',
    '[\"username\",\"email\",\"provider\",\"password\",\"resetPasswordToken\",\"confirmationToken\",\"confirmed\",\"blocked\",\"role\"]',
    '[]',
    1,
    '2021-03-27 18:51:17',
    '2021-03-27 18:51:17'
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
    'plugins::content-manager.explorer.update',
    'application::language.language',
    '[\"name\",\"code\"]',
    '[]',
    1,
    '2021-03-27 18:51:17',
    '2021-03-27 18:51:17'
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
    'plugins::content-manager.explorer.update',
    'plugins::users-permissions.user',
    '[\"username\",\"email\",\"provider\",\"password\",\"resetPasswordToken\",\"confirmationToken\",\"confirmed\",\"blocked\",\"role\"]',
    '[]',
    1,
    '2021-03-27 18:51:17',
    '2021-03-27 18:51:17'
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
    'plugins::content-manager.explorer.delete',
    'application::language.language',
    NULL,
    '[]',
    1,
    '2021-03-27 18:51:17',
    '2021-03-27 18:51:17'
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
    'plugins::content-manager.explorer.delete',
    'plugins::users-permissions.user',
    NULL,
    '[]',
    1,
    '2021-03-27 18:51:17',
    '2021-03-27 18:51:17'
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
    'plugins::content-type-builder.read',
    NULL,
    NULL,
    '[]',
    1,
    '2021-03-27 18:51:17',
    '2021-03-27 18:51:17'
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
    'plugins::upload.read',
    NULL,
    NULL,
    '[]',
    1,
    '2021-03-27 18:51:17',
    '2021-03-27 18:51:17'
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
    'plugins::upload.assets.create',
    NULL,
    NULL,
    '[]',
    1,
    '2021-03-27 18:51:17',
    '2021-03-27 18:51:17'
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
    'plugins::upload.assets.update',
    NULL,
    NULL,
    '[]',
    1,
    '2021-03-27 18:51:17',
    '2021-03-27 18:51:17'
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
    'plugins::upload.assets.download',
    NULL,
    NULL,
    '[]',
    1,
    '2021-03-27 18:51:17',
    '2021-03-27 18:51:17'
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
    'plugins::upload.assets.copy-link',
    NULL,
    NULL,
    '[]',
    1,
    '2021-03-27 18:51:17',
    '2021-03-27 18:51:17'
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
    'plugins::upload.settings.read',
    NULL,
    NULL,
    '[]',
    1,
    '2021-03-27 18:51:17',
    '2021-03-27 18:51:17'
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
    'plugins::content-manager.single-types.configure-view',
    NULL,
    NULL,
    '[]',
    1,
    '2021-03-27 18:51:17',
    '2021-03-27 18:51:17'
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
    'plugins::content-manager.collection-types.configure-view',
    NULL,
    NULL,
    '[]',
    1,
    '2021-03-27 18:51:17',
    '2021-03-27 18:51:17'
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
    'plugins::content-manager.components.configure-layout',
    NULL,
    NULL,
    '[]',
    1,
    '2021-03-27 18:51:17',
    '2021-03-27 18:51:17'
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
    'plugins::users-permissions.roles.create',
    NULL,
    NULL,
    '[]',
    1,
    '2021-03-27 18:51:17',
    '2021-03-27 18:51:17'
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
    'plugins::users-permissions.roles.read',
    NULL,
    NULL,
    '[]',
    1,
    '2021-03-27 18:51:17',
    '2021-03-27 18:51:17'
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
    'plugins::users-permissions.roles.update',
    NULL,
    NULL,
    '[]',
    1,
    '2021-03-27 18:51:17',
    '2021-03-27 18:51:17'
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
    'plugins::users-permissions.roles.delete',
    NULL,
    NULL,
    '[]',
    1,
    '2021-03-27 18:51:17',
    '2021-03-27 18:51:17'
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
    'plugins::users-permissions.providers.read',
    NULL,
    NULL,
    '[]',
    1,
    '2021-03-27 18:51:17',
    '2021-03-27 18:51:17'
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
    'plugins::users-permissions.providers.update',
    NULL,
    NULL,
    '[]',
    1,
    '2021-03-27 18:51:17',
    '2021-03-27 18:51:17'
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
    'plugins::users-permissions.email-templates.read',
    NULL,
    NULL,
    '[]',
    1,
    '2021-03-27 18:51:17',
    '2021-03-27 18:51:17'
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
    'plugins::users-permissions.email-templates.update',
    NULL,
    NULL,
    '[]',
    1,
    '2021-03-27 18:51:17',
    '2021-03-27 18:51:17'
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
    'plugins::users-permissions.advanced-settings.read',
    NULL,
    NULL,
    '[]',
    1,
    '2021-03-27 18:51:17',
    '2021-03-27 18:51:17'
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
    'plugins::users-permissions.advanced-settings.update',
    NULL,
    NULL,
    '[]',
    1,
    '2021-03-27 18:51:17',
    '2021-03-27 18:51:17'
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
    'admin::marketplace.read',
    NULL,
    NULL,
    '[]',
    1,
    '2021-03-27 18:51:17',
    '2021-03-27 18:51:17'
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
    'admin::marketplace.plugins.install',
    NULL,
    NULL,
    '[]',
    1,
    '2021-03-27 18:51:17',
    '2021-03-27 18:51:18'
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
    'admin::marketplace.plugins.uninstall',
    NULL,
    NULL,
    '[]',
    1,
    '2021-03-27 18:51:18',
    '2021-03-27 18:51:18'
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
    50,
    'admin::webhooks.create',
    NULL,
    NULL,
    '[]',
    1,
    '2021-03-27 18:51:18',
    '2021-03-27 18:51:18'
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
    51,
    'admin::webhooks.read',
    NULL,
    NULL,
    '[]',
    1,
    '2021-03-27 18:51:18',
    '2021-03-27 18:51:18'
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
    'admin::webhooks.update',
    NULL,
    NULL,
    '[]',
    1,
    '2021-03-27 18:51:18',
    '2021-03-27 18:51:18'
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
    53,
    'admin::webhooks.delete',
    NULL,
    NULL,
    '[]',
    1,
    '2021-03-27 18:51:18',
    '2021-03-27 18:51:18'
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
    'admin::users.create',
    NULL,
    NULL,
    '[]',
    1,
    '2021-03-27 18:51:18',
    '2021-03-27 18:51:18'
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
    'admin::users.read',
    NULL,
    NULL,
    '[]',
    1,
    '2021-03-27 18:51:18',
    '2021-03-27 18:51:18'
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
    'admin::users.update',
    NULL,
    NULL,
    '[]',
    1,
    '2021-03-27 18:51:18',
    '2021-03-27 18:51:18'
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
    'admin::users.delete',
    NULL,
    NULL,
    '[]',
    1,
    '2021-03-27 18:51:18',
    '2021-03-27 18:51:18'
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
    'admin::roles.create',
    NULL,
    NULL,
    '[]',
    1,
    '2021-03-27 18:51:18',
    '2021-03-27 18:51:18'
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
    'admin::roles.read',
    NULL,
    NULL,
    '[]',
    1,
    '2021-03-27 18:51:18',
    '2021-03-27 18:51:18'
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
    'admin::roles.update',
    NULL,
    NULL,
    '[]',
    1,
    '2021-03-27 18:51:18',
    '2021-03-27 18:51:18'
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
    61,
    'admin::roles.delete',
    NULL,
    NULL,
    '[]',
    1,
    '2021-03-27 18:51:18',
    '2021-03-27 18:51:18'
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
    62,
    'plugins::content-manager.explorer.create',
    'application::index-page.index-page',
    '[\"name\",\"language\",\"head.title\",\"head.description\",\"head.ogType\",\"head.ogImage\"]',
    '[]',
    1,
    '2021-03-27 18:54:53',
    '2021-05-03 15:23:19'
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
    63,
    'plugins::content-manager.explorer.read',
    'application::index-page.index-page',
    '[\"name\",\"language\",\"head.title\",\"head.description\",\"head.ogType\",\"head.ogImage\"]',
    '[]',
    1,
    '2021-03-27 18:54:53',
    '2021-05-03 15:23:19'
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
    64,
    'plugins::content-manager.explorer.delete',
    'application::index-page.index-page',
    NULL,
    '[]',
    1,
    '2021-03-27 18:54:53',
    '2021-03-27 18:54:53'
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
    65,
    'plugins::content-manager.explorer.update',
    'application::index-page.index-page',
    '[\"name\",\"language\",\"head.title\",\"head.description\",\"head.ogType\",\"head.ogImage\"]',
    '[]',
    1,
    '2021-03-27 18:54:53',
    '2021-05-03 15:23:19'
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
    69,
    'plugins::content-manager.explorer.delete',
    'application::project.project',
    NULL,
    '[]',
    1,
    '2021-05-03 21:02:17',
    '2021-05-03 21:02:17'
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
    72,
    'plugins::content-manager.explorer.delete',
    'application::flow-page.flow-page',
    NULL,
    '[]',
    1,
    '2021-05-04 17:33:19',
    '2021-05-04 17:33:19'
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
    80,
    'plugins::content-manager.explorer.create',
    'application::flow-page.flow-page',
    '[\"name\",\"language\",\"flowItems.name\",\"flowItems.image\",\"flowItems.description\",\"asideDescription\",\"slideImages\"]',
    '[]',
    1,
    '2021-05-15 10:38:55',
    '2021-05-15 10:38:55'
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
    81,
    'plugins::content-manager.explorer.read',
    'application::flow-page.flow-page',
    '[\"name\",\"language\",\"flowItems.name\",\"flowItems.image\",\"flowItems.description\",\"asideDescription\",\"slideImages\"]',
    '[]',
    1,
    '2021-05-15 10:38:55',
    '2021-05-15 10:38:55'
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
    82,
    'plugins::content-manager.explorer.update',
    'application::flow-page.flow-page',
    '[\"name\",\"language\",\"flowItems.name\",\"flowItems.image\",\"flowItems.description\",\"asideDescription\",\"slideImages\"]',
    '[]',
    1,
    '2021-05-15 10:38:55',
    '2021-05-15 10:38:55'
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
    83,
    'plugins::content-manager.explorer.create',
    'application::project.project',
    '[\"localizedHead.localizedTitle.text\",\"localizedHead.localizedTitle.language\",\"localizedHead.localizedDescription.language\",\"localizedHead.localizedDescription.text\",\"localizedHead.ogType\",\"localizedHead.ogImage\",\"localizedName.text\",\"localizedName.language\",\"urlSlug\",\"creativeItems.name\",\"creativeItems.image\",\"creativeItems.description\"]',
    '[]',
    1,
    '2021-06-06 21:15:46',
    '2021-06-06 21:15:47'
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
    84,
    'plugins::content-manager.explorer.read',
    'application::project.project',
    '[\"localizedHead.localizedTitle.text\",\"localizedHead.localizedTitle.language\",\"localizedHead.localizedDescription.language\",\"localizedHead.localizedDescription.text\",\"localizedHead.ogType\",\"localizedHead.ogImage\",\"localizedName.text\",\"localizedName.language\",\"urlSlug\",\"creativeItems.name\",\"creativeItems.image\",\"creativeItems.description\"]',
    '[]',
    1,
    '2021-06-06 21:15:46',
    '2021-06-06 21:15:47'
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
    85,
    'plugins::content-manager.explorer.update',
    'application::project.project',
    '[\"localizedHead.localizedTitle.text\",\"localizedHead.localizedTitle.language\",\"localizedHead.localizedDescription.language\",\"localizedHead.localizedDescription.text\",\"localizedHead.ogType\",\"localizedHead.ogImage\",\"localizedName.text\",\"localizedName.language\",\"urlSlug\",\"creativeItems.name\",\"creativeItems.image\",\"creativeItems.description\"]',
    '[]',
    1,
    '2021-06-06 21:15:46',
    '2021-06-06 21:15:47'
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
    '2021-03-27 18:51:16',
    '2021-03-27 18:51:16'
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
    '2021-03-27 18:51:16',
    '2021-03-27 18:51:16'
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
    '2021-03-27 18:51:16',
    '2021-03-27 18:51:16'
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

INSERT INTO
  `upload_file` (
    `id`,
    `name`,
    `alternativeText`,
    `caption`,
    `width`,
    `height`,
    `formats`,
    `hash`,
    `ext`,
    `mime`,
    `size`,
    `url`,
    `previewUrl`,
    `provider`,
    `provider_metadata`,
    `created_by`,
    `updated_by`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    1,
    '333-100.jpg',
    '',
    '',
    1920,
    1080,
    '{\"thumbnail\":{\"name\":\"thumbnail_333-100.jpg\",\"hash\":\"thumbnail_333_100_8f6561e04c\",\"ext\":\".jpg\",\"mime\":\"image/jpeg\",\"width\":245,\"height\":138,\"size\":5.41,\"path\":null,\"url\":\"https://res.cloudinary.com/dpv0ukspz/image/upload/v1622410817/thumbnail_333_100_8f6561e04c.jpg\",\"provider_metadata\":{\"public_id\":\"thumbnail_333_100_8f6561e04c\",\"resource_type\":\"image\"}},\"large\":{\"name\":\"large_333-100.jpg\",\"hash\":\"large_333_100_8f6561e04c\",\"ext\":\".jpg\",\"mime\":\"image/jpeg\",\"width\":1000,\"height\":563,\"size\":29,\"path\":null,\"url\":\"https://res.cloudinary.com/dpv0ukspz/image/upload/v1622410818/large_333_100_8f6561e04c.jpg\",\"provider_metadata\":{\"public_id\":\"large_333_100_8f6561e04c\",\"resource_type\":\"image\"}},\"medium\":{\"name\":\"medium_333-100.jpg\",\"hash\":\"medium_333_100_8f6561e04c\",\"ext\":\".jpg\",\"mime\":\"image/jpeg\",\"width\":750,\"height\":422,\"size\":20.37,\"path\":null,\"url\":\"https://res.cloudinary.com/dpv0ukspz/image/upload/v1622410819/medium_333_100_8f6561e04c.jpg\",\"provider_metadata\":{\"public_id\":\"medium_333_100_8f6561e04c\",\"resource_type\":\"image\"}},\"small\":{\"name\":\"small_333-100.jpg\",\"hash\":\"small_333_100_8f6561e04c\",\"ext\":\".jpg\",\"mime\":\"image/jpeg\",\"width\":500,\"height\":281,\"size\":12.56,\"path\":null,\"url\":\"https://res.cloudinary.com/dpv0ukspz/image/upload/v1622410819/small_333_100_8f6561e04c.jpg\",\"provider_metadata\":{\"public_id\":\"small_333_100_8f6561e04c\",\"resource_type\":\"image\"}}}',
    '333_100_8f6561e04c',
    '.jpg',
    'image/jpeg',
    64.53,
    'https://res.cloudinary.com/dpv0ukspz/image/upload/v1622410816/333_100_8f6561e04c.jpg',
    NULL,
    'cloudinary',
    '{\"public_id\":\"333_100_8f6561e04c\",\"resource_type\":\"image\"}',
    1,
    1,
    '2021-05-03 21:10:33',
    '2021-05-30 21:40:19'
  );
INSERT INTO
  `upload_file` (
    `id`,
    `name`,
    `alternativeText`,
    `caption`,
    `width`,
    `height`,
    `formats`,
    `hash`,
    `ext`,
    `mime`,
    `size`,
    `url`,
    `previewUrl`,
    `provider`,
    `provider_metadata`,
    `created_by`,
    `updated_by`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    2,
    'bg-100.jpg',
    '',
    '',
    1189,
    669,
    '{\"thumbnail\":{\"name\":\"thumbnail_bg-100.jpg\",\"hash\":\"thumbnail_bg_100_a34d767389\",\"ext\":\".jpg\",\"mime\":\"image/jpeg\",\"width\":245,\"height\":138,\"size\":4.94,\"path\":null,\"url\":\"https://res.cloudinary.com/dpv0ukspz/image/upload/v1621075012/thumbnail_bg_100_a34d767389.jpg\",\"provider_metadata\":{\"public_id\":\"thumbnail_bg_100_a34d767389\",\"resource_type\":\"image\"}},\"large\":{\"name\":\"large_bg-100.jpg\",\"hash\":\"large_bg_100_a34d767389\",\"ext\":\".jpg\",\"mime\":\"image/jpeg\",\"width\":1000,\"height\":563,\"size\":44.26,\"path\":null,\"url\":\"https://res.cloudinary.com/dpv0ukspz/image/upload/v1621075013/large_bg_100_a34d767389.jpg\",\"provider_metadata\":{\"public_id\":\"large_bg_100_a34d767389\",\"resource_type\":\"image\"}},\"medium\":{\"name\":\"medium_bg-100.jpg\",\"hash\":\"medium_bg_100_a34d767389\",\"ext\":\".jpg\",\"mime\":\"image/jpeg\",\"width\":750,\"height\":422,\"size\":28.32,\"path\":null,\"url\":\"https://res.cloudinary.com/dpv0ukspz/image/upload/v1621075014/medium_bg_100_a34d767389.jpg\",\"provider_metadata\":{\"public_id\":\"medium_bg_100_a34d767389\",\"resource_type\":\"image\"}},\"small\":{\"name\":\"small_bg-100.jpg\",\"hash\":\"small_bg_100_a34d767389\",\"ext\":\".jpg\",\"mime\":\"image/jpeg\",\"width\":500,\"height\":281,\"size\":14.9,\"path\":null,\"url\":\"https://res.cloudinary.com/dpv0ukspz/image/upload/v1621075014/small_bg_100_a34d767389.jpg\",\"provider_metadata\":{\"public_id\":\"small_bg_100_a34d767389\",\"resource_type\":\"image\"}}}',
    'bg_100_a34d767389',
    '.jpg',
    'image/jpeg',
    56.42,
    'https://res.cloudinary.com/dpv0ukspz/image/upload/v1621075011/bg_100_a34d767389.jpg',
    NULL,
    'cloudinary',
    '{\"public_id\":\"bg_100_a34d767389\",\"resource_type\":\"image\"}',
    1,
    1,
    '2021-05-03 23:19:21',
    '2021-05-15 10:36:56'
  );
INSERT INTO
  `upload_file` (
    `id`,
    `name`,
    `alternativeText`,
    `caption`,
    `width`,
    `height`,
    `formats`,
    `hash`,
    `ext`,
    `mime`,
    `size`,
    `url`,
    `previewUrl`,
    `provider`,
    `provider_metadata`,
    `created_by`,
    `updated_by`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    3,
    'e1.jpg',
    '',
    '',
    1050,
    700,
    '{\"thumbnail\":{\"name\":\"thumbnail_e1.jpg\",\"hash\":\"thumbnail_e1_d826090c67\",\"ext\":\".jpg\",\"mime\":\"image/jpeg\",\"width\":234,\"height\":156,\"size\":8.93,\"path\":null,\"url\":\"https://res.cloudinary.com/dpv0ukspz/image/upload/v1621074954/thumbnail_e1_d826090c67.jpg\",\"provider_metadata\":{\"public_id\":\"thumbnail_e1_d826090c67\",\"resource_type\":\"image\"}},\"large\":{\"name\":\"large_e1.jpg\",\"hash\":\"large_e1_d826090c67\",\"ext\":\".jpg\",\"mime\":\"image/jpeg\",\"width\":1000,\"height\":667,\"size\":91.6,\"path\":null,\"url\":\"https://res.cloudinary.com/dpv0ukspz/image/upload/v1621074955/large_e1_d826090c67.jpg\",\"provider_metadata\":{\"public_id\":\"large_e1_d826090c67\",\"resource_type\":\"image\"}},\"medium\":{\"name\":\"medium_e1.jpg\",\"hash\":\"medium_e1_d826090c67\",\"ext\":\".jpg\",\"mime\":\"image/jpeg\",\"width\":750,\"height\":500,\"size\":57.3,\"path\":null,\"url\":\"https://res.cloudinary.com/dpv0ukspz/image/upload/v1621074956/medium_e1_d826090c67.jpg\",\"provider_metadata\":{\"public_id\":\"medium_e1_d826090c67\",\"resource_type\":\"image\"}},\"small\":{\"name\":\"small_e1.jpg\",\"hash\":\"small_e1_d826090c67\",\"ext\":\".jpg\",\"mime\":\"image/jpeg\",\"width\":500,\"height\":333,\"size\":29.12,\"path\":null,\"url\":\"https://res.cloudinary.com/dpv0ukspz/image/upload/v1621074957/small_e1_d826090c67.jpg\",\"provider_metadata\":{\"public_id\":\"small_e1_d826090c67\",\"resource_type\":\"image\"}}}',
    'e1_d826090c67',
    '.jpg',
    'image/jpeg',
    100.94,
    'https://res.cloudinary.com/dpv0ukspz/image/upload/v1621074954/e1_d826090c67.jpg',
    NULL,
    'cloudinary',
    '{\"public_id\":\"e1_d826090c67\",\"resource_type\":\"image\"}',
    1,
    1,
    '2021-05-04 17:47:50',
    '2021-05-15 10:35:58'
  );
INSERT INTO
  `upload_file` (
    `id`,
    `name`,
    `alternativeText`,
    `caption`,
    `width`,
    `height`,
    `formats`,
    `hash`,
    `ext`,
    `mime`,
    `size`,
    `url`,
    `previewUrl`,
    `provider`,
    `provider_metadata`,
    `created_by`,
    `updated_by`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    4,
    'e3.jpg',
    '',
    '',
    1189,
    669,
    '{\"thumbnail\":{\"name\":\"thumbnail_e3.jpg\",\"hash\":\"thumbnail_e3_592a5fb80b\",\"ext\":\".jpg\",\"mime\":\"image/jpeg\",\"width\":245,\"height\":138,\"size\":4.94,\"path\":null,\"url\":\"https://res.cloudinary.com/dpv0ukspz/image/upload/v1621074990/thumbnail_e3_592a5fb80b.jpg\",\"provider_metadata\":{\"public_id\":\"thumbnail_e3_592a5fb80b\",\"resource_type\":\"image\"}},\"large\":{\"name\":\"large_e3.jpg\",\"hash\":\"large_e3_592a5fb80b\",\"ext\":\".jpg\",\"mime\":\"image/jpeg\",\"width\":1000,\"height\":563,\"size\":44.26,\"path\":null,\"url\":\"https://res.cloudinary.com/dpv0ukspz/image/upload/v1621074991/large_e3_592a5fb80b.jpg\",\"provider_metadata\":{\"public_id\":\"large_e3_592a5fb80b\",\"resource_type\":\"image\"}},\"medium\":{\"name\":\"medium_e3.jpg\",\"hash\":\"medium_e3_592a5fb80b\",\"ext\":\".jpg\",\"mime\":\"image/jpeg\",\"width\":750,\"height\":422,\"size\":28.32,\"path\":null,\"url\":\"https://res.cloudinary.com/dpv0ukspz/image/upload/v1621074992/medium_e3_592a5fb80b.jpg\",\"provider_metadata\":{\"public_id\":\"medium_e3_592a5fb80b\",\"resource_type\":\"image\"}},\"small\":{\"name\":\"small_e3.jpg\",\"hash\":\"small_e3_592a5fb80b\",\"ext\":\".jpg\",\"mime\":\"image/jpeg\",\"width\":500,\"height\":281,\"size\":14.9,\"path\":null,\"url\":\"https://res.cloudinary.com/dpv0ukspz/image/upload/v1621074993/small_e3_592a5fb80b.jpg\",\"provider_metadata\":{\"public_id\":\"small_e3_592a5fb80b\",\"resource_type\":\"image\"}}}',
    'e3_592a5fb80b',
    '.jpg',
    'image/jpeg',
    56.42,
    'https://res.cloudinary.com/dpv0ukspz/image/upload/v1621074990/e3_592a5fb80b.jpg',
    NULL,
    'cloudinary',
    '{\"public_id\":\"e3_592a5fb80b\",\"resource_type\":\"image\"}',
    1,
    1,
    '2021-05-04 17:48:42',
    '2021-05-15 10:36:34'
  );
INSERT INTO
  `upload_file` (
    `id`,
    `name`,
    `alternativeText`,
    `caption`,
    `width`,
    `height`,
    `formats`,
    `hash`,
    `ext`,
    `mime`,
    `size`,
    `url`,
    `previewUrl`,
    `provider`,
    `provider_metadata`,
    `created_by`,
    `updated_by`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    5,
    'e2.jpg',
    '',
    '',
    1050,
    700,
    '{\"thumbnail\":{\"name\":\"thumbnail_e2.jpg\",\"hash\":\"thumbnail_e2_a59f9b0802\",\"ext\":\".jpg\",\"mime\":\"image/jpeg\",\"width\":234,\"height\":156,\"size\":6.62,\"path\":null,\"url\":\"https://res.cloudinary.com/dpv0ukspz/image/upload/v1621074972/thumbnail_e2_a59f9b0802.jpg\",\"provider_metadata\":{\"public_id\":\"thumbnail_e2_a59f9b0802\",\"resource_type\":\"image\"}},\"large\":{\"name\":\"large_e2.jpg\",\"hash\":\"large_e2_a59f9b0802\",\"ext\":\".jpg\",\"mime\":\"image/jpeg\",\"width\":1000,\"height\":667,\"size\":66.87,\"path\":null,\"url\":\"https://res.cloudinary.com/dpv0ukspz/image/upload/v1621074973/large_e2_a59f9b0802.jpg\",\"provider_metadata\":{\"public_id\":\"large_e2_a59f9b0802\",\"resource_type\":\"image\"}},\"medium\":{\"name\":\"medium_e2.jpg\",\"hash\":\"medium_e2_a59f9b0802\",\"ext\":\".jpg\",\"mime\":\"image/jpeg\",\"width\":750,\"height\":500,\"size\":43.19,\"path\":null,\"url\":\"https://res.cloudinary.com/dpv0ukspz/image/upload/v1621074974/medium_e2_a59f9b0802.jpg\",\"provider_metadata\":{\"public_id\":\"medium_e2_a59f9b0802\",\"resource_type\":\"image\"}},\"small\":{\"name\":\"small_e2.jpg\",\"hash\":\"small_e2_a59f9b0802\",\"ext\":\".jpg\",\"mime\":\"image/jpeg\",\"width\":500,\"height\":333,\"size\":22.21,\"path\":null,\"url\":\"https://res.cloudinary.com/dpv0ukspz/image/upload/v1621074975/small_e2_a59f9b0802.jpg\",\"provider_metadata\":{\"public_id\":\"small_e2_a59f9b0802\",\"resource_type\":\"image\"}}}',
    'e2_a59f9b0802',
    '.jpg',
    'image/jpeg',
    71.42,
    'https://res.cloudinary.com/dpv0ukspz/image/upload/v1621074972/e2_a59f9b0802.jpg',
    NULL,
    'cloudinary',
    '{\"public_id\":\"e2_a59f9b0802\",\"resource_type\":\"image\"}',
    1,
    1,
    '2021-05-04 17:49:16',
    '2021-05-15 10:36:17'
  );
INSERT INTO
  `upload_file` (
    `id`,
    `name`,
    `alternativeText`,
    `caption`,
    `width`,
    `height`,
    `formats`,
    `hash`,
    `ext`,
    `mime`,
    `size`,
    `url`,
    `previewUrl`,
    `provider`,
    `provider_metadata`,
    `created_by`,
    `updated_by`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    6,
    '3.jpg',
    '',
    '',
    675,
    900,
    '{\"thumbnail\":{\"name\":\"thumbnail_3.jpg\",\"hash\":\"thumbnail_3_e1d5402125\",\"ext\":\".jpg\",\"mime\":\"image/jpeg\",\"width\":117,\"height\":156,\"size\":4.02,\"path\":null,\"url\":\"https://res.cloudinary.com/dpv0ukspz/image/upload/v1621075189/thumbnail_3_e1d5402125.jpg\",\"provider_metadata\":{\"public_id\":\"thumbnail_3_e1d5402125\",\"resource_type\":\"image\"}},\"medium\":{\"name\":\"medium_3.jpg\",\"hash\":\"medium_3_e1d5402125\",\"ext\":\".jpg\",\"mime\":\"image/jpeg\",\"width\":563,\"height\":750,\"size\":32.3,\"path\":null,\"url\":\"https://res.cloudinary.com/dpv0ukspz/image/upload/v1621075190/medium_3_e1d5402125.jpg\",\"provider_metadata\":{\"public_id\":\"medium_3_e1d5402125\",\"resource_type\":\"image\"}},\"small\":{\"name\":\"small_3.jpg\",\"hash\":\"small_3_e1d5402125\",\"ext\":\".jpg\",\"mime\":\"image/jpeg\",\"width\":375,\"height\":500,\"size\":18.46,\"path\":null,\"url\":\"https://res.cloudinary.com/dpv0ukspz/image/upload/v1621075190/small_3_e1d5402125.jpg\",\"provider_metadata\":{\"public_id\":\"small_3_e1d5402125\",\"resource_type\":\"image\"}}}',
    '3_e1d5402125',
    '.jpg',
    'image/jpeg',
    41.95,
    'https://res.cloudinary.com/dpv0ukspz/image/upload/v1621075188/3_e1d5402125.jpg',
    NULL,
    'cloudinary',
    '{\"public_id\":\"3_e1d5402125\",\"resource_type\":\"image\"}',
    1,
    1,
    '2021-05-15 10:39:51',
    '2021-05-15 10:39:51'
  );
INSERT INTO
  `upload_file` (
    `id`,
    `name`,
    `alternativeText`,
    `caption`,
    `width`,
    `height`,
    `formats`,
    `hash`,
    `ext`,
    `mime`,
    `size`,
    `url`,
    `previewUrl`,
    `provider`,
    `provider_metadata`,
    `created_by`,
    `updated_by`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    7,
    '4.jpg',
    '',
    '',
    634,
    951,
    '{\"thumbnail\":{\"name\":\"thumbnail_4.jpg\",\"hash\":\"thumbnail_4_4273d6ef68\",\"ext\":\".jpg\",\"mime\":\"image/jpeg\",\"width\":104,\"height\":156,\"size\":4.15,\"path\":null,\"url\":\"https://res.cloudinary.com/dpv0ukspz/image/upload/v1621075189/thumbnail_4_4273d6ef68.jpg\",\"provider_metadata\":{\"public_id\":\"thumbnail_4_4273d6ef68\",\"resource_type\":\"image\"}},\"medium\":{\"name\":\"medium_4.jpg\",\"hash\":\"medium_4_4273d6ef68\",\"ext\":\".jpg\",\"mime\":\"image/jpeg\",\"width\":500,\"height\":750,\"size\":52.48,\"path\":null,\"url\":\"https://res.cloudinary.com/dpv0ukspz/image/upload/v1621075190/medium_4_4273d6ef68.jpg\",\"provider_metadata\":{\"public_id\":\"medium_4_4273d6ef68\",\"resource_type\":\"image\"}},\"small\":{\"name\":\"small_4.jpg\",\"hash\":\"small_4_4273d6ef68\",\"ext\":\".jpg\",\"mime\":\"image/jpeg\",\"width\":333,\"height\":500,\"size\":28.06,\"path\":null,\"url\":\"https://res.cloudinary.com/dpv0ukspz/image/upload/v1621075191/small_4_4273d6ef68.jpg\",\"provider_metadata\":{\"public_id\":\"small_4_4273d6ef68\",\"resource_type\":\"image\"}}}',
    '4_4273d6ef68',
    '.jpg',
    'image/jpeg',
    74.27,
    'https://res.cloudinary.com/dpv0ukspz/image/upload/v1621075188/4_4273d6ef68.jpg',
    NULL,
    'cloudinary',
    '{\"public_id\":\"4_4273d6ef68\",\"resource_type\":\"image\"}',
    1,
    1,
    '2021-05-15 10:39:52',
    '2021-05-15 10:39:52'
  );
INSERT INTO
  `upload_file` (
    `id`,
    `name`,
    `alternativeText`,
    `caption`,
    `width`,
    `height`,
    `formats`,
    `hash`,
    `ext`,
    `mime`,
    `size`,
    `url`,
    `previewUrl`,
    `provider`,
    `provider_metadata`,
    `created_by`,
    `updated_by`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    8,
    '6.jpg',
    '',
    '',
    634,
    951,
    '{\"thumbnail\":{\"name\":\"thumbnail_6.jpg\",\"hash\":\"thumbnail_6_3fbea5e093\",\"ext\":\".jpg\",\"mime\":\"image/jpeg\",\"width\":104,\"height\":156,\"size\":6.65,\"path\":null,\"url\":\"https://res.cloudinary.com/dpv0ukspz/image/upload/v1621075189/thumbnail_6_3fbea5e093.jpg\",\"provider_metadata\":{\"public_id\":\"thumbnail_6_3fbea5e093\",\"resource_type\":\"image\"}},\"medium\":{\"name\":\"medium_6.jpg\",\"hash\":\"medium_6_3fbea5e093\",\"ext\":\".jpg\",\"mime\":\"image/jpeg\",\"width\":500,\"height\":750,\"size\":77.5,\"path\":null,\"url\":\"https://res.cloudinary.com/dpv0ukspz/image/upload/v1621075190/medium_6_3fbea5e093.jpg\",\"provider_metadata\":{\"public_id\":\"medium_6_3fbea5e093\",\"resource_type\":\"image\"}},\"small\":{\"name\":\"small_6.jpg\",\"hash\":\"small_6_3fbea5e093\",\"ext\":\".jpg\",\"mime\":\"image/jpeg\",\"width\":333,\"height\":500,\"size\":41.5,\"path\":null,\"url\":\"https://res.cloudinary.com/dpv0ukspz/image/upload/v1621075191/small_6_3fbea5e093.jpg\",\"provider_metadata\":{\"public_id\":\"small_6_3fbea5e093\",\"resource_type\":\"image\"}}}',
    '6_3fbea5e093',
    '.jpg',
    'image/jpeg',
    112.36,
    'https://res.cloudinary.com/dpv0ukspz/image/upload/v1621075189/6_3fbea5e093.jpg',
    NULL,
    'cloudinary',
    '{\"public_id\":\"6_3fbea5e093\",\"resource_type\":\"image\"}',
    1,
    1,
    '2021-05-15 10:39:52',
    '2021-05-15 10:39:52'
  );
INSERT INTO
  `upload_file` (
    `id`,
    `name`,
    `alternativeText`,
    `caption`,
    `width`,
    `height`,
    `formats`,
    `hash`,
    `ext`,
    `mime`,
    `size`,
    `url`,
    `previewUrl`,
    `provider`,
    `provider_metadata`,
    `created_by`,
    `updated_by`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    9,
    '8.jpg',
    '',
    '',
    615,
    977,
    '{\"thumbnail\":{\"name\":\"thumbnail_8.jpg\",\"hash\":\"thumbnail_8_4f8b31dda9\",\"ext\":\".jpg\",\"mime\":\"image/jpeg\",\"width\":98,\"height\":156,\"size\":2.22,\"path\":null,\"url\":\"https://res.cloudinary.com/dpv0ukspz/image/upload/v1621075189/thumbnail_8_4f8b31dda9.jpg\",\"provider_metadata\":{\"public_id\":\"thumbnail_8_4f8b31dda9\",\"resource_type\":\"image\"}},\"medium\":{\"name\":\"medium_8.jpg\",\"hash\":\"medium_8_4f8b31dda9\",\"ext\":\".jpg\",\"mime\":\"image/jpeg\",\"width\":472,\"height\":750,\"size\":31.53,\"path\":null,\"url\":\"https://res.cloudinary.com/dpv0ukspz/image/upload/v1621075190/medium_8_4f8b31dda9.jpg\",\"provider_metadata\":{\"public_id\":\"medium_8_4f8b31dda9\",\"resource_type\":\"image\"}},\"small\":{\"name\":\"small_8.jpg\",\"hash\":\"small_8_4f8b31dda9\",\"ext\":\".jpg\",\"mime\":\"image/jpeg\",\"width\":315,\"height\":500,\"size\":16.59,\"path\":null,\"url\":\"https://res.cloudinary.com/dpv0ukspz/image/upload/v1621075191/small_8_4f8b31dda9.jpg\",\"provider_metadata\":{\"public_id\":\"small_8_4f8b31dda9\",\"resource_type\":\"image\"}}}',
    '8_4f8b31dda9',
    '.jpg',
    'image/jpeg',
    47.50,
    'https://res.cloudinary.com/dpv0ukspz/image/upload/v1621075188/8_4f8b31dda9.jpg',
    NULL,
    'cloudinary',
    '{\"public_id\":\"8_4f8b31dda9\",\"resource_type\":\"image\"}',
    1,
    1,
    '2021-05-15 10:39:52',
    '2021-05-15 10:39:52'
  );
INSERT INTO
  `upload_file` (
    `id`,
    `name`,
    `alternativeText`,
    `caption`,
    `width`,
    `height`,
    `formats`,
    `hash`,
    `ext`,
    `mime`,
    `size`,
    `url`,
    `previewUrl`,
    `provider`,
    `provider_metadata`,
    `created_by`,
    `updated_by`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    10,
    '7.jpg',
    '',
    '',
    634,
    951,
    '{\"thumbnail\":{\"name\":\"thumbnail_7.jpg\",\"hash\":\"thumbnail_7_726ea90b79\",\"ext\":\".jpg\",\"mime\":\"image/jpeg\",\"width\":104,\"height\":156,\"size\":3.49,\"path\":null,\"url\":\"https://res.cloudinary.com/dpv0ukspz/image/upload/v1621075189/thumbnail_7_726ea90b79.jpg\",\"provider_metadata\":{\"public_id\":\"thumbnail_7_726ea90b79\",\"resource_type\":\"image\"}},\"medium\":{\"name\":\"medium_7.jpg\",\"hash\":\"medium_7_726ea90b79\",\"ext\":\".jpg\",\"mime\":\"image/jpeg\",\"width\":500,\"height\":750,\"size\":50.17,\"path\":null,\"url\":\"https://res.cloudinary.com/dpv0ukspz/image/upload/v1621075191/medium_7_726ea90b79.jpg\",\"provider_metadata\":{\"public_id\":\"medium_7_726ea90b79\",\"resource_type\":\"image\"}},\"small\":{\"name\":\"small_7.jpg\",\"hash\":\"small_7_726ea90b79\",\"ext\":\".jpg\",\"mime\":\"image/jpeg\",\"width\":333,\"height\":500,\"size\":22.1,\"path\":null,\"url\":\"https://res.cloudinary.com/dpv0ukspz/image/upload/v1621075191/small_7_726ea90b79.jpg\",\"provider_metadata\":{\"public_id\":\"small_7_726ea90b79\",\"resource_type\":\"image\"}}}',
    '7_726ea90b79',
    '.jpg',
    'image/jpeg',
    82.40,
    'https://res.cloudinary.com/dpv0ukspz/image/upload/v1621075188/7_726ea90b79.jpg',
    NULL,
    'cloudinary',
    '{\"public_id\":\"7_726ea90b79\",\"resource_type\":\"image\"}',
    1,
    1,
    '2021-05-15 10:39:53',
    '2021-05-15 10:39:53'
  );
INSERT INTO
  `upload_file` (
    `id`,
    `name`,
    `alternativeText`,
    `caption`,
    `width`,
    `height`,
    `formats`,
    `hash`,
    `ext`,
    `mime`,
    `size`,
    `url`,
    `previewUrl`,
    `provider`,
    `provider_metadata`,
    `created_by`,
    `updated_by`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    11,
    '2.jpg',
    '',
    '',
    634,
    951,
    '{\"thumbnail\":{\"name\":\"thumbnail_2.jpg\",\"hash\":\"thumbnail_2_3f4b8f95b2\",\"ext\":\".jpg\",\"mime\":\"image/jpeg\",\"width\":104,\"height\":156,\"size\":3.89,\"path\":null,\"url\":\"https://res.cloudinary.com/dpv0ukspz/image/upload/v1621075190/thumbnail_2_3f4b8f95b2.jpg\",\"provider_metadata\":{\"public_id\":\"thumbnail_2_3f4b8f95b2\",\"resource_type\":\"image\"}},\"medium\":{\"name\":\"medium_2.jpg\",\"hash\":\"medium_2_3f4b8f95b2\",\"ext\":\".jpg\",\"mime\":\"image/jpeg\",\"width\":500,\"height\":750,\"size\":68.17,\"path\":null,\"url\":\"https://res.cloudinary.com/dpv0ukspz/image/upload/v1621075191/medium_2_3f4b8f95b2.jpg\",\"provider_metadata\":{\"public_id\":\"medium_2_3f4b8f95b2\",\"resource_type\":\"image\"}},\"small\":{\"name\":\"small_2.jpg\",\"hash\":\"small_2_3f4b8f95b2\",\"ext\":\".jpg\",\"mime\":\"image/jpeg\",\"width\":333,\"height\":500,\"size\":32.04,\"path\":null,\"url\":\"https://res.cloudinary.com/dpv0ukspz/image/upload/v1621075192/small_2_3f4b8f95b2.jpg\",\"provider_metadata\":{\"public_id\":\"small_2_3f4b8f95b2\",\"resource_type\":\"image\"}}}',
    '2_3f4b8f95b2',
    '.jpg',
    'image/jpeg',
    109.48,
    'https://res.cloudinary.com/dpv0ukspz/image/upload/v1621075189/2_3f4b8f95b2.jpg',
    NULL,
    'cloudinary',
    '{\"public_id\":\"2_3f4b8f95b2\",\"resource_type\":\"image\"}',
    1,
    1,
    '2021-05-15 10:39:53',
    '2021-05-15 10:39:53'
  );
INSERT INTO
  `upload_file` (
    `id`,
    `name`,
    `alternativeText`,
    `caption`,
    `width`,
    `height`,
    `formats`,
    `hash`,
    `ext`,
    `mime`,
    `size`,
    `url`,
    `previewUrl`,
    `provider`,
    `provider_metadata`,
    `created_by`,
    `updated_by`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    12,
    '9.jpg',
    '',
    '',
    534,
    533,
    '{\"thumbnail\":{\"name\":\"thumbnail_9.jpg\",\"hash\":\"thumbnail_9_112f9470bc\",\"ext\":\".jpg\",\"mime\":\"image/jpeg\",\"width\":156,\"height\":156,\"size\":3.37,\"path\":null,\"url\":\"https://res.cloudinary.com/dpv0ukspz/image/upload/v1623014557/thumbnail_9_112f9470bc.jpg\",\"provider_metadata\":{\"public_id\":\"thumbnail_9_112f9470bc\",\"resource_type\":\"image\"}},\"small\":{\"name\":\"small_9.jpg\",\"hash\":\"small_9_112f9470bc\",\"ext\":\".jpg\",\"mime\":\"image/jpeg\",\"width\":500,\"height\":499,\"size\":22.73,\"path\":null,\"url\":\"https://res.cloudinary.com/dpv0ukspz/image/upload/v1623014558/small_9_112f9470bc.jpg\",\"provider_metadata\":{\"public_id\":\"small_9_112f9470bc\",\"resource_type\":\"image\"}}}',
    '9_112f9470bc',
    '.jpg',
    'image/jpeg',
    25.48,
    'https://res.cloudinary.com/dpv0ukspz/image/upload/v1623014556/9_112f9470bc.jpg',
    NULL,
    'cloudinary',
    '{\"public_id\":\"9_112f9470bc\",\"resource_type\":\"image\"}',
    1,
    1,
    '2021-05-15 10:39:55',
    '2021-06-06 21:22:38'
  );
INSERT INTO
  `upload_file` (
    `id`,
    `name`,
    `alternativeText`,
    `caption`,
    `width`,
    `height`,
    `formats`,
    `hash`,
    `ext`,
    `mime`,
    `size`,
    `url`,
    `previewUrl`,
    `provider`,
    `provider_metadata`,
    `created_by`,
    `updated_by`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    13,
    'maglo.JPG',
    '',
    '',
    1920,
    1080,
    '{\"thumbnail\":{\"name\":\"thumbnail_maglo.JPG\",\"hash\":\"thumbnail_maglo_460db704e4\",\"ext\":\".JPG\",\"mime\":\"image/jpeg\",\"width\":245,\"height\":138,\"size\":4.07,\"path\":null,\"url\":\"https://res.cloudinary.com/dpv0ukspz/image/upload/v1622410866/thumbnail_maglo_460db704e4.jpg\",\"provider_metadata\":{\"public_id\":\"thumbnail_maglo_460db704e4\",\"resource_type\":\"image\"}},\"large\":{\"name\":\"large_maglo.JPG\",\"hash\":\"large_maglo_460db704e4\",\"ext\":\".JPG\",\"mime\":\"image/jpeg\",\"width\":1000,\"height\":563,\"size\":69.55,\"path\":null,\"url\":\"https://res.cloudinary.com/dpv0ukspz/image/upload/v1622410867/large_maglo_460db704e4.jpg\",\"provider_metadata\":{\"public_id\":\"large_maglo_460db704e4\",\"resource_type\":\"image\"}},\"medium\":{\"name\":\"medium_maglo.JPG\",\"hash\":\"medium_maglo_460db704e4\",\"ext\":\".JPG\",\"mime\":\"image/jpeg\",\"width\":750,\"height\":422,\"size\":39.59,\"path\":null,\"url\":\"https://res.cloudinary.com/dpv0ukspz/image/upload/v1622410869/medium_maglo_460db704e4.jpg\",\"provider_metadata\":{\"public_id\":\"medium_maglo_460db704e4\",\"resource_type\":\"image\"}},\"small\":{\"name\":\"small_maglo.JPG\",\"hash\":\"small_maglo_460db704e4\",\"ext\":\".JPG\",\"mime\":\"image/jpeg\",\"width\":500,\"height\":281,\"size\":17.5,\"path\":null,\"url\":\"https://res.cloudinary.com/dpv0ukspz/image/upload/v1622410870/small_maglo_460db704e4.jpg\",\"provider_metadata\":{\"public_id\":\"small_maglo_460db704e4\",\"resource_type\":\"image\"}}}',
    'maglo_460db704e4',
    '.JPG',
    'image/jpeg',
    174.26,
    'https://res.cloudinary.com/dpv0ukspz/image/upload/v1622410866/maglo_460db704e4.jpg',
    NULL,
    'cloudinary',
    '{\"public_id\":\"maglo_460db704e4\",\"resource_type\":\"image\"}',
    1,
    1,
    '2021-05-30 12:29:01',
    '2021-05-30 21:41:09'
  );
INSERT INTO
  `upload_file` (
    `id`,
    `name`,
    `alternativeText`,
    `caption`,
    `width`,
    `height`,
    `formats`,
    `hash`,
    `ext`,
    `mime`,
    `size`,
    `url`,
    `previewUrl`,
    `provider`,
    `provider_metadata`,
    `created_by`,
    `updated_by`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    14,
    'floow.JPG',
    '',
    '',
    1920,
    1080,
    '{\"thumbnail\":{\"name\":\"thumbnail_floow.JPG\",\"hash\":\"thumbnail_floow_968d7d9eaa\",\"ext\":\".JPG\",\"mime\":\"image/jpeg\",\"width\":245,\"height\":138,\"size\":6.19,\"path\":null,\"url\":\"https://res.cloudinary.com/dpv0ukspz/image/upload/v1622410843/thumbnail_floow_968d7d9eaa.jpg\",\"provider_metadata\":{\"public_id\":\"thumbnail_floow_968d7d9eaa\",\"resource_type\":\"image\"}},\"large\":{\"name\":\"large_floow.JPG\",\"hash\":\"large_floow_968d7d9eaa\",\"ext\":\".JPG\",\"mime\":\"image/jpeg\",\"width\":1000,\"height\":563,\"size\":52.56,\"path\":null,\"url\":\"https://res.cloudinary.com/dpv0ukspz/image/upload/v1622410844/large_floow_968d7d9eaa.jpg\",\"provider_metadata\":{\"public_id\":\"large_floow_968d7d9eaa\",\"resource_type\":\"image\"}},\"medium\":{\"name\":\"medium_floow.JPG\",\"hash\":\"medium_floow_968d7d9eaa\",\"ext\":\".JPG\",\"mime\":\"image/jpeg\",\"width\":750,\"height\":422,\"size\":33.37,\"path\":null,\"url\":\"https://res.cloudinary.com/dpv0ukspz/image/upload/v1622410844/medium_floow_968d7d9eaa.jpg\",\"provider_metadata\":{\"public_id\":\"medium_floow_968d7d9eaa\",\"resource_type\":\"image\"}},\"small\":{\"name\":\"small_floow.JPG\",\"hash\":\"small_floow_968d7d9eaa\",\"ext\":\".JPG\",\"mime\":\"image/jpeg\",\"width\":500,\"height\":281,\"size\":17.88,\"path\":null,\"url\":\"https://res.cloudinary.com/dpv0ukspz/image/upload/v1622410845/small_floow_968d7d9eaa.jpg\",\"provider_metadata\":{\"public_id\":\"small_floow_968d7d9eaa\",\"resource_type\":\"image\"}}}',
    'floow_968d7d9eaa',
    '.JPG',
    'image/jpeg',
    144.07,
    'https://res.cloudinary.com/dpv0ukspz/image/upload/v1622410842/floow_968d7d9eaa.jpg',
    NULL,
    'cloudinary',
    '{\"public_id\":\"floow_968d7d9eaa\",\"resource_type\":\"image\"}',
    1,
    1,
    '2021-05-30 12:32:48',
    '2021-05-30 21:40:44'
  );
INSERT INTO
  `upload_file` (
    `id`,
    `name`,
    `alternativeText`,
    `caption`,
    `width`,
    `height`,
    `formats`,
    `hash`,
    `ext`,
    `mime`,
    `size`,
    `url`,
    `previewUrl`,
    `provider`,
    `provider_metadata`,
    `created_by`,
    `updated_by`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    15,
    '3.jpg',
    '',
    '',
    2048,
    1034,
    '{\"thumbnail\":{\"name\":\"thumbnail_3.jpg\",\"hash\":\"thumbnail_3_fa78bdce48\",\"ext\":\".jpg\",\"mime\":\"image/jpeg\",\"width\":245,\"height\":124,\"size\":9.93,\"path\":null,\"url\":\"https://res.cloudinary.com/dpv0ukspz/image/upload/v1623621601/thumbnail_3_fa78bdce48.jpg\",\"provider_metadata\":{\"public_id\":\"thumbnail_3_fa78bdce48\",\"resource_type\":\"image\"}},\"large\":{\"name\":\"large_3.jpg\",\"hash\":\"large_3_fa78bdce48\",\"ext\":\".jpg\",\"mime\":\"image/jpeg\",\"width\":1000,\"height\":505,\"size\":125.5,\"path\":null,\"url\":\"https://res.cloudinary.com/dpv0ukspz/image/upload/v1623621602/large_3_fa78bdce48.jpg\",\"provider_metadata\":{\"public_id\":\"large_3_fa78bdce48\",\"resource_type\":\"image\"}},\"medium\":{\"name\":\"medium_3.jpg\",\"hash\":\"medium_3_fa78bdce48\",\"ext\":\".jpg\",\"mime\":\"image/jpeg\",\"width\":750,\"height\":379,\"size\":74.19,\"path\":null,\"url\":\"https://res.cloudinary.com/dpv0ukspz/image/upload/v1623621603/medium_3_fa78bdce48.jpg\",\"provider_metadata\":{\"public_id\":\"medium_3_fa78bdce48\",\"resource_type\":\"image\"}},\"small\":{\"name\":\"small_3.jpg\",\"hash\":\"small_3_fa78bdce48\",\"ext\":\".jpg\",\"mime\":\"image/jpeg\",\"width\":500,\"height\":252,\"size\":34.79,\"path\":null,\"url\":\"https://res.cloudinary.com/dpv0ukspz/image/upload/v1623621604/small_3_fa78bdce48.jpg\",\"provider_metadata\":{\"public_id\":\"small_3_fa78bdce48\",\"resource_type\":\"image\"}}}',
    '3_fa78bdce48',
    '.jpg',
    'image/jpeg',
    521.55,
    'https://res.cloudinary.com/dpv0ukspz/image/upload/v1623621600/3_fa78bdce48.jpg',
    NULL,
    'cloudinary',
    '{\"public_id\":\"3_fa78bdce48\",\"resource_type\":\"image\"}',
    1,
    1,
    '2021-06-06 21:22:47',
    '2021-06-13 22:00:05'
  );
INSERT INTO
  `upload_file` (
    `id`,
    `name`,
    `alternativeText`,
    `caption`,
    `width`,
    `height`,
    `formats`,
    `hash`,
    `ext`,
    `mime`,
    `size`,
    `url`,
    `previewUrl`,
    `provider`,
    `provider_metadata`,
    `created_by`,
    `updated_by`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    16,
    '5.jpg',
    '',
    '',
    1438,
    714,
    '{\"thumbnail\":{\"name\":\"thumbnail_5.jpg\",\"hash\":\"thumbnail_5_d0a384470b\",\"ext\":\".jpg\",\"mime\":\"image/jpeg\",\"width\":245,\"height\":122,\"size\":6.94,\"path\":null,\"url\":\"https://res.cloudinary.com/dpv0ukspz/image/upload/v1623621855/thumbnail_5_d0a384470b.jpg\",\"provider_metadata\":{\"public_id\":\"thumbnail_5_d0a384470b\",\"resource_type\":\"image\"}},\"large\":{\"name\":\"large_5.jpg\",\"hash\":\"large_5_d0a384470b\",\"ext\":\".jpg\",\"mime\":\"image/jpeg\",\"width\":1000,\"height\":497,\"size\":70.79,\"path\":null,\"url\":\"https://res.cloudinary.com/dpv0ukspz/image/upload/v1623621856/large_5_d0a384470b.jpg\",\"provider_metadata\":{\"public_id\":\"large_5_d0a384470b\",\"resource_type\":\"image\"}},\"medium\":{\"name\":\"medium_5.jpg\",\"hash\":\"medium_5_d0a384470b\",\"ext\":\".jpg\",\"mime\":\"image/jpeg\",\"width\":750,\"height\":372,\"size\":42.9,\"path\":null,\"url\":\"https://res.cloudinary.com/dpv0ukspz/image/upload/v1623621857/medium_5_d0a384470b.jpg\",\"provider_metadata\":{\"public_id\":\"medium_5_d0a384470b\",\"resource_type\":\"image\"}},\"small\":{\"name\":\"small_5.jpg\",\"hash\":\"small_5_d0a384470b\",\"ext\":\".jpg\",\"mime\":\"image/jpeg\",\"width\":500,\"height\":248,\"size\":21.55,\"path\":null,\"url\":\"https://res.cloudinary.com/dpv0ukspz/image/upload/v1623621857/small_5_d0a384470b.jpg\",\"provider_metadata\":{\"public_id\":\"small_5_d0a384470b\",\"resource_type\":\"image\"}}}',
    '5_d0a384470b',
    '.jpg',
    'image/jpeg',
    137.58,
    'https://res.cloudinary.com/dpv0ukspz/image/upload/v1623621854/5_d0a384470b.jpg',
    NULL,
    'cloudinary',
    '{\"public_id\":\"5_d0a384470b\",\"resource_type\":\"image\"}',
    1,
    1,
    '2021-06-09 22:28:31',
    '2021-06-13 22:04:18'
  );
INSERT INTO
  `upload_file` (
    `id`,
    `name`,
    `alternativeText`,
    `caption`,
    `width`,
    `height`,
    `formats`,
    `hash`,
    `ext`,
    `mime`,
    `size`,
    `url`,
    `previewUrl`,
    `provider`,
    `provider_metadata`,
    `created_by`,
    `updated_by`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    17,
    'particleszz.png',
    '',
    '',
    2256,
    1262,
    '{\"thumbnail\":{\"name\":\"thumbnail_particleszz.png\",\"hash\":\"thumbnail_particleszz_a9a3a00b91\",\"ext\":\".png\",\"mime\":\"image/png\",\"width\":245,\"height\":137,\"size\":76.84,\"path\":null,\"url\":\"https://res.cloudinary.com/dpv0ukspz/image/upload/v1623622678/thumbnail_particleszz_a9a3a00b91.png\",\"provider_metadata\":{\"public_id\":\"thumbnail_particleszz_a9a3a00b91\",\"resource_type\":\"image\"}},\"large\":{\"name\":\"large_particleszz.png\",\"hash\":\"large_particleszz_a9a3a00b91\",\"ext\":\".png\",\"mime\":\"image/png\",\"width\":1000,\"height\":559,\"size\":996.47,\"path\":null,\"url\":\"https://res.cloudinary.com/dpv0ukspz/image/upload/v1623622681/large_particleszz_a9a3a00b91.png\",\"provider_metadata\":{\"public_id\":\"large_particleszz_a9a3a00b91\",\"resource_type\":\"image\"}},\"medium\":{\"name\":\"medium_particleszz.png\",\"hash\":\"medium_particleszz_a9a3a00b91\",\"ext\":\".png\",\"mime\":\"image/png\",\"width\":750,\"height\":420,\"size\":604.51,\"path\":null,\"url\":\"https://res.cloudinary.com/dpv0ukspz/image/upload/v1623622683/medium_particleszz_a9a3a00b91.png\",\"provider_metadata\":{\"public_id\":\"medium_particleszz_a9a3a00b91\",\"resource_type\":\"image\"}},\"small\":{\"name\":\"small_particleszz.png\",\"hash\":\"small_particleszz_a9a3a00b91\",\"ext\":\".png\",\"mime\":\"image/png\",\"width\":500,\"height\":280,\"size\":294.91,\"path\":null,\"url\":\"https://res.cloudinary.com/dpv0ukspz/image/upload/v1623622687/small_particleszz_a9a3a00b91.png\",\"provider_metadata\":{\"public_id\":\"small_particleszz_a9a3a00b91\",\"resource_type\":\"image\"}}}',
    'particleszz_a9a3a00b91',
    '.png',
    'image/png',
    599.22,
    'https://res.cloudinary.com/dpv0ukspz/image/upload/v1623622677/particleszz_a9a3a00b91.png',
    NULL,
    'cloudinary',
    '{\"public_id\":\"particleszz_a9a3a00b91\",\"resource_type\":\"image\"}',
    1,
    1,
    '2021-06-13 21:30:17',
    '2021-06-13 22:18:08'
  );
INSERT INTO
  `upload_file` (
    `id`,
    `name`,
    `alternativeText`,
    `caption`,
    `width`,
    `height`,
    `formats`,
    `hash`,
    `ext`,
    `mime`,
    `size`,
    `url`,
    `previewUrl`,
    `provider`,
    `provider_metadata`,
    `created_by`,
    `updated_by`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    18,
    '7.jpg',
    '',
    '',
    680,
    373,
    '{\"thumbnail\":{\"name\":\"thumbnail_7.jpg\",\"hash\":\"thumbnail_7_363d532ed0\",\"ext\":\".jpg\",\"mime\":\"image/jpeg\",\"width\":245,\"height\":134,\"size\":10.74,\"path\":null,\"url\":\"https://res.cloudinary.com/dpv0ukspz/image/upload/v1623620657/thumbnail_7_363d532ed0.jpg\",\"provider_metadata\":{\"public_id\":\"thumbnail_7_363d532ed0\",\"resource_type\":\"image\"}},\"small\":{\"name\":\"small_7.jpg\",\"hash\":\"small_7_363d532ed0\",\"ext\":\".jpg\",\"mime\":\"image/jpeg\",\"width\":500,\"height\":274,\"size\":36.01,\"path\":null,\"url\":\"https://res.cloudinary.com/dpv0ukspz/image/upload/v1623620658/small_7_363d532ed0.jpg\",\"provider_metadata\":{\"public_id\":\"small_7_363d532ed0\",\"resource_type\":\"image\"}}}',
    '7_363d532ed0',
    '.jpg',
    'image/jpeg',
    63.55,
    'https://res.cloudinary.com/dpv0ukspz/image/upload/v1623620656/7_363d532ed0.jpg',
    NULL,
    'cloudinary',
    '{\"public_id\":\"7_363d532ed0\",\"resource_type\":\"image\"}',
    1,
    1,
    '2021-06-13 21:44:18',
    '2021-06-13 21:44:19'
  );
INSERT INTO
  `upload_file` (
    `id`,
    `name`,
    `alternativeText`,
    `caption`,
    `width`,
    `height`,
    `formats`,
    `hash`,
    `ext`,
    `mime`,
    `size`,
    `url`,
    `previewUrl`,
    `provider`,
    `provider_metadata`,
    `created_by`,
    `updated_by`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    19,
    'ssz.JPG',
    '',
    '',
    1872,
    924,
    '{\"thumbnail\":{\"name\":\"thumbnail_ssz.JPG\",\"hash\":\"thumbnail_ssz_0f7305da88\",\"ext\":\".JPG\",\"mime\":\"image/jpeg\",\"width\":245,\"height\":121,\"size\":2.07,\"path\":null,\"url\":\"https://res.cloudinary.com/dpv0ukspz/image/upload/v1626900205/thumbnail_ssz_0f7305da88.jpg\",\"provider_metadata\":{\"public_id\":\"thumbnail_ssz_0f7305da88\",\"resource_type\":\"image\"}},\"large\":{\"name\":\"large_ssz.JPG\",\"hash\":\"large_ssz_0f7305da88\",\"ext\":\".JPG\",\"mime\":\"image/jpeg\",\"width\":1000,\"height\":494,\"size\":12.62,\"path\":null,\"url\":\"https://res.cloudinary.com/dpv0ukspz/image/upload/v1626900205/large_ssz_0f7305da88.jpg\",\"provider_metadata\":{\"public_id\":\"large_ssz_0f7305da88\",\"resource_type\":\"image\"}},\"medium\":{\"name\":\"medium_ssz.JPG\",\"hash\":\"medium_ssz_0f7305da88\",\"ext\":\".JPG\",\"mime\":\"image/jpeg\",\"width\":750,\"height\":370,\"size\":9.1,\"path\":null,\"url\":\"https://res.cloudinary.com/dpv0ukspz/image/upload/v1626900206/medium_ssz_0f7305da88.jpg\",\"provider_metadata\":{\"public_id\":\"medium_ssz_0f7305da88\",\"resource_type\":\"image\"}},\"small\":{\"name\":\"small_ssz.JPG\",\"hash\":\"small_ssz_0f7305da88\",\"ext\":\".JPG\",\"mime\":\"image/jpeg\",\"width\":500,\"height\":247,\"size\":5.54,\"path\":null,\"url\":\"https://res.cloudinary.com/dpv0ukspz/image/upload/v1626900207/small_ssz_0f7305da88.jpg\",\"provider_metadata\":{\"public_id\":\"small_ssz_0f7305da88\",\"resource_type\":\"image\"}}}',
    'ssz_0f7305da88',
    '.JPG',
    'image/jpeg',
    26.27,
    'https://res.cloudinary.com/dpv0ukspz/image/upload/v1626900204/ssz_0f7305da88.jpg',
    NULL,
    'cloudinary',
    '{\"public_id\":\"ssz_0f7305da88\",\"resource_type\":\"image\"}',
    1,
    1,
    '2021-07-21 20:43:27',
    '2021-07-21 20:43:27'
  );
INSERT INTO
  `upload_file` (
    `id`,
    `name`,
    `alternativeText`,
    `caption`,
    `width`,
    `height`,
    `formats`,
    `hash`,
    `ext`,
    `mime`,
    `size`,
    `url`,
    `previewUrl`,
    `provider`,
    `provider_metadata`,
    `created_by`,
    `updated_by`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    20,
    'qqqq.png',
    '',
    '',
    1795,
    854,
    '{\"thumbnail\":{\"name\":\"thumbnail_qqqq.png\",\"hash\":\"thumbnail_qqqq_c0ed5caf0c\",\"ext\":\".png\",\"mime\":\"image/png\",\"width\":245,\"height\":117,\"size\":9.23,\"path\":null,\"url\":\"https://res.cloudinary.com/dpv0ukspz/image/upload/v1627381415/thumbnail_qqqq_c0ed5caf0c.png\",\"provider_metadata\":{\"public_id\":\"thumbnail_qqqq_c0ed5caf0c\",\"resource_type\":\"image\"}},\"large\":{\"name\":\"large_qqqq.png\",\"hash\":\"large_qqqq_c0ed5caf0c\",\"ext\":\".png\",\"mime\":\"image/png\",\"width\":1000,\"height\":476,\"size\":73.59,\"path\":null,\"url\":\"https://res.cloudinary.com/dpv0ukspz/image/upload/v1627381417/large_qqqq_c0ed5caf0c.png\",\"provider_metadata\":{\"public_id\":\"large_qqqq_c0ed5caf0c\",\"resource_type\":\"image\"}},\"medium\":{\"name\":\"medium_qqqq.png\",\"hash\":\"medium_qqqq_c0ed5caf0c\",\"ext\":\".png\",\"mime\":\"image/png\",\"width\":750,\"height\":357,\"size\":41.53,\"path\":null,\"url\":\"https://res.cloudinary.com/dpv0ukspz/image/upload/v1627381418/medium_qqqq_c0ed5caf0c.png\",\"provider_metadata\":{\"public_id\":\"medium_qqqq_c0ed5caf0c\",\"resource_type\":\"image\"}},\"small\":{\"name\":\"small_qqqq.png\",\"hash\":\"small_qqqq_c0ed5caf0c\",\"ext\":\".png\",\"mime\":\"image/png\",\"width\":500,\"height\":238,\"size\":23.68,\"path\":null,\"url\":\"https://res.cloudinary.com/dpv0ukspz/image/upload/v1627381419/small_qqqq_c0ed5caf0c.png\",\"provider_metadata\":{\"public_id\":\"small_qqqq_c0ed5caf0c\",\"resource_type\":\"image\"}}}',
    'qqqq_c0ed5caf0c',
    '.png',
    'image/png',
    94.74,
    'https://res.cloudinary.com/dpv0ukspz/image/upload/v1627381414/qqqq_c0ed5caf0c.png',
    NULL,
    'cloudinary',
    '{\"public_id\":\"qqqq_c0ed5caf0c\",\"resource_type\":\"image\"}',
    1,
    1,
    '2021-07-27 10:23:39',
    '2021-07-27 10:23:39'
  );
INSERT INTO
  `upload_file` (
    `id`,
    `name`,
    `alternativeText`,
    `caption`,
    `width`,
    `height`,
    `formats`,
    `hash`,
    `ext`,
    `mime`,
    `size`,
    `url`,
    `previewUrl`,
    `provider`,
    `provider_metadata`,
    `created_by`,
    `updated_by`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    21,
    'z1.jpg',
    '',
    '',
    634,
    951,
    '{\"thumbnail\":{\"name\":\"thumbnail_z1.jpg\",\"hash\":\"thumbnail_z1_bf9492377d\",\"ext\":\".jpg\",\"mime\":\"image/jpeg\",\"width\":104,\"height\":156,\"size\":4.39,\"path\":null,\"url\":\"https://res.cloudinary.com/dpv0ukspz/image/upload/v1628284873/thumbnail_z1_bf9492377d.jpg\",\"provider_metadata\":{\"public_id\":\"thumbnail_z1_bf9492377d\",\"resource_type\":\"image\"}},\"medium\":{\"name\":\"medium_z1.jpg\",\"hash\":\"medium_z1_bf9492377d\",\"ext\":\".jpg\",\"mime\":\"image/jpeg\",\"width\":500,\"height\":750,\"size\":50.06,\"path\":null,\"url\":\"https://res.cloudinary.com/dpv0ukspz/image/upload/v1628284875/medium_z1_bf9492377d.jpg\",\"provider_metadata\":{\"public_id\":\"medium_z1_bf9492377d\",\"resource_type\":\"image\"}},\"small\":{\"name\":\"small_z1.jpg\",\"hash\":\"small_z1_bf9492377d\",\"ext\":\".jpg\",\"mime\":\"image/jpeg\",\"width\":333,\"height\":500,\"size\":27.13,\"path\":null,\"url\":\"https://res.cloudinary.com/dpv0ukspz/image/upload/v1628284876/small_z1_bf9492377d.jpg\",\"provider_metadata\":{\"public_id\":\"small_z1_bf9492377d\",\"resource_type\":\"image\"}}}',
    'z1_bf9492377d',
    '.jpg',
    'image/jpeg',
    71.12,
    'https://res.cloudinary.com/dpv0ukspz/image/upload/v1628284873/z1_bf9492377d.jpg',
    NULL,
    'cloudinary',
    '{\"public_id\":\"z1_bf9492377d\",\"resource_type\":\"image\"}',
    1,
    1,
    '2021-08-06 21:21:17',
    '2021-08-06 21:21:17'
  );
INSERT INTO
  `upload_file` (
    `id`,
    `name`,
    `alternativeText`,
    `caption`,
    `width`,
    `height`,
    `formats`,
    `hash`,
    `ext`,
    `mime`,
    `size`,
    `url`,
    `previewUrl`,
    `provider`,
    `provider_metadata`,
    `created_by`,
    `updated_by`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    22,
    'z2.jpg',
    '',
    '',
    632,
    953,
    '{\"thumbnail\":{\"name\":\"thumbnail_z2.jpg\",\"hash\":\"thumbnail_z2_c3fedb3836\",\"ext\":\".jpg\",\"mime\":\"image/jpeg\",\"width\":103,\"height\":156,\"size\":5,\"path\":null,\"url\":\"https://res.cloudinary.com/dpv0ukspz/image/upload/v1628284934/thumbnail_z2_c3fedb3836.jpg\",\"provider_metadata\":{\"public_id\":\"thumbnail_z2_c3fedb3836\",\"resource_type\":\"image\"}},\"medium\":{\"name\":\"medium_z2.jpg\",\"hash\":\"medium_z2_c3fedb3836\",\"ext\":\".jpg\",\"mime\":\"image/jpeg\",\"width\":497,\"height\":750,\"size\":93.92,\"path\":null,\"url\":\"https://res.cloudinary.com/dpv0ukspz/image/upload/v1628284936/medium_z2_c3fedb3836.jpg\",\"provider_metadata\":{\"public_id\":\"medium_z2_c3fedb3836\",\"resource_type\":\"image\"}},\"small\":{\"name\":\"small_z2.jpg\",\"hash\":\"small_z2_c3fedb3836\",\"ext\":\".jpg\",\"mime\":\"image/jpeg\",\"width\":332,\"height\":500,\"size\":44.38,\"path\":null,\"url\":\"https://res.cloudinary.com/dpv0ukspz/image/upload/v1628284937/small_z2_c3fedb3836.jpg\",\"provider_metadata\":{\"public_id\":\"small_z2_c3fedb3836\",\"resource_type\":\"image\"}}}',
    'z2_c3fedb3836',
    '.jpg',
    'image/jpeg',
    142.80,
    'https://res.cloudinary.com/dpv0ukspz/image/upload/v1628284933/z2_c3fedb3836.jpg',
    NULL,
    'cloudinary',
    '{\"public_id\":\"z2_c3fedb3836\",\"resource_type\":\"image\"}',
    1,
    1,
    '2021-08-06 21:22:19',
    '2021-08-06 21:22:19'
  );
INSERT INTO
  `upload_file` (
    `id`,
    `name`,
    `alternativeText`,
    `caption`,
    `width`,
    `height`,
    `formats`,
    `hash`,
    `ext`,
    `mime`,
    `size`,
    `url`,
    `previewUrl`,
    `provider`,
    `provider_metadata`,
    `created_by`,
    `updated_by`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    23,
    'z3.jpg',
    '',
    '',
    1055,
    700,
    '{\"thumbnail\":{\"name\":\"thumbnail_z3.jpg\",\"hash\":\"thumbnail_z3_fce7f16b2c\",\"ext\":\".jpg\",\"mime\":\"image/jpeg\",\"width\":235,\"height\":156,\"size\":8.95,\"path\":null,\"url\":\"https://res.cloudinary.com/dpv0ukspz/image/upload/v1628284969/thumbnail_z3_fce7f16b2c.jpg\",\"provider_metadata\":{\"public_id\":\"thumbnail_z3_fce7f16b2c\",\"resource_type\":\"image\"}},\"large\":{\"name\":\"large_z3.jpg\",\"hash\":\"large_z3_fce7f16b2c\",\"ext\":\".jpg\",\"mime\":\"image/jpeg\",\"width\":1000,\"height\":664,\"size\":139.56,\"path\":null,\"url\":\"https://res.cloudinary.com/dpv0ukspz/image/upload/v1628284970/large_z3_fce7f16b2c.jpg\",\"provider_metadata\":{\"public_id\":\"large_z3_fce7f16b2c\",\"resource_type\":\"image\"}},\"medium\":{\"name\":\"medium_z3.jpg\",\"hash\":\"medium_z3_fce7f16b2c\",\"ext\":\".jpg\",\"mime\":\"image/jpeg\",\"width\":750,\"height\":498,\"size\":82.44,\"path\":null,\"url\":\"https://res.cloudinary.com/dpv0ukspz/image/upload/v1628284971/medium_z3_fce7f16b2c.jpg\",\"provider_metadata\":{\"public_id\":\"medium_z3_fce7f16b2c\",\"resource_type\":\"image\"}},\"small\":{\"name\":\"small_z3.jpg\",\"hash\":\"small_z3_fce7f16b2c\",\"ext\":\".jpg\",\"mime\":\"image/jpeg\",\"width\":500,\"height\":332,\"size\":36.48,\"path\":null,\"url\":\"https://res.cloudinary.com/dpv0ukspz/image/upload/v1628284972/small_z3_fce7f16b2c.jpg\",\"provider_metadata\":{\"public_id\":\"small_z3_fce7f16b2c\",\"resource_type\":\"image\"}}}',
    'z3_fce7f16b2c',
    '.jpg',
    'image/jpeg',
    158.30,
    'https://res.cloudinary.com/dpv0ukspz/image/upload/v1628284968/z3_fce7f16b2c.jpg',
    NULL,
    'cloudinary',
    '{\"public_id\":\"z3_fce7f16b2c\",\"resource_type\":\"image\"}',
    1,
    1,
    '2021-08-06 21:22:53',
    '2021-08-06 21:22:53'
  );
INSERT INTO
  `upload_file` (
    `id`,
    `name`,
    `alternativeText`,
    `caption`,
    `width`,
    `height`,
    `formats`,
    `hash`,
    `ext`,
    `mime`,
    `size`,
    `url`,
    `previewUrl`,
    `provider`,
    `provider_metadata`,
    `created_by`,
    `updated_by`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    24,
    'z4.jpg',
    '',
    '',
    634,
    951,
    '{\"thumbnail\":{\"name\":\"thumbnail_z4.jpg\",\"hash\":\"thumbnail_z4_83be7fba08\",\"ext\":\".jpg\",\"mime\":\"image/jpeg\",\"width\":104,\"height\":156,\"size\":2.97,\"path\":null,\"url\":\"https://res.cloudinary.com/dpv0ukspz/image/upload/v1628285049/thumbnail_z4_83be7fba08.jpg\",\"provider_metadata\":{\"public_id\":\"thumbnail_z4_83be7fba08\",\"resource_type\":\"image\"}},\"medium\":{\"name\":\"medium_z4.jpg\",\"hash\":\"medium_z4_83be7fba08\",\"ext\":\".jpg\",\"mime\":\"image/jpeg\",\"width\":500,\"height\":750,\"size\":63.06,\"path\":null,\"url\":\"https://res.cloudinary.com/dpv0ukspz/image/upload/v1628285050/medium_z4_83be7fba08.jpg\",\"provider_metadata\":{\"public_id\":\"medium_z4_83be7fba08\",\"resource_type\":\"image\"}},\"small\":{\"name\":\"small_z4.jpg\",\"hash\":\"small_z4_83be7fba08\",\"ext\":\".jpg\",\"mime\":\"image/jpeg\",\"width\":333,\"height\":500,\"size\":26.6,\"path\":null,\"url\":\"https://res.cloudinary.com/dpv0ukspz/image/upload/v1628285051/small_z4_83be7fba08.jpg\",\"provider_metadata\":{\"public_id\":\"small_z4_83be7fba08\",\"resource_type\":\"image\"}}}',
    'z4_83be7fba08',
    '.jpg',
    'image/jpeg',
    104.05,
    'https://res.cloudinary.com/dpv0ukspz/image/upload/v1628285048/z4_83be7fba08.jpg',
    NULL,
    'cloudinary',
    '{\"public_id\":\"z4_83be7fba08\",\"resource_type\":\"image\"}',
    1,
    1,
    '2021-08-06 21:24:12',
    '2021-08-06 21:24:12'
  );
INSERT INTO
  `upload_file` (
    `id`,
    `name`,
    `alternativeText`,
    `caption`,
    `width`,
    `height`,
    `formats`,
    `hash`,
    `ext`,
    `mime`,
    `size`,
    `url`,
    `previewUrl`,
    `provider`,
    `provider_metadata`,
    `created_by`,
    `updated_by`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    25,
    'z5.jpg',
    '',
    '',
    1050,
    700,
    '{\"thumbnail\":{\"name\":\"thumbnail_z5.jpg\",\"hash\":\"thumbnail_z5_0f74f06f1b\",\"ext\":\".jpg\",\"mime\":\"image/jpeg\",\"width\":234,\"height\":156,\"size\":10.74,\"path\":null,\"url\":\"https://res.cloudinary.com/dpv0ukspz/image/upload/v1628285131/thumbnail_z5_0f74f06f1b.jpg\",\"provider_metadata\":{\"public_id\":\"thumbnail_z5_0f74f06f1b\",\"resource_type\":\"image\"}},\"large\":{\"name\":\"large_z5.jpg\",\"hash\":\"large_z5_0f74f06f1b\",\"ext\":\".jpg\",\"mime\":\"image/jpeg\",\"width\":1000,\"height\":667,\"size\":160.25,\"path\":null,\"url\":\"https://res.cloudinary.com/dpv0ukspz/image/upload/v1628285132/large_z5_0f74f06f1b.jpg\",\"provider_metadata\":{\"public_id\":\"large_z5_0f74f06f1b\",\"resource_type\":\"image\"}},\"medium\":{\"name\":\"medium_z5.jpg\",\"hash\":\"medium_z5_0f74f06f1b\",\"ext\":\".jpg\",\"mime\":\"image/jpeg\",\"width\":750,\"height\":500,\"size\":95.32,\"path\":null,\"url\":\"https://res.cloudinary.com/dpv0ukspz/image/upload/v1628285133/medium_z5_0f74f06f1b.jpg\",\"provider_metadata\":{\"public_id\":\"medium_z5_0f74f06f1b\",\"resource_type\":\"image\"}},\"small\":{\"name\":\"small_z5.jpg\",\"hash\":\"small_z5_0f74f06f1b\",\"ext\":\".jpg\",\"mime\":\"image/jpeg\",\"width\":500,\"height\":333,\"size\":42.58,\"path\":null,\"url\":\"https://res.cloudinary.com/dpv0ukspz/image/upload/v1628285134/small_z5_0f74f06f1b.jpg\",\"provider_metadata\":{\"public_id\":\"small_z5_0f74f06f1b\",\"resource_type\":\"image\"}}}',
    'z5_0f74f06f1b',
    '.jpg',
    'image/jpeg',
    176.53,
    'https://res.cloudinary.com/dpv0ukspz/image/upload/v1628285130/z5_0f74f06f1b.jpg',
    NULL,
    'cloudinary',
    '{\"public_id\":\"z5_0f74f06f1b\",\"resource_type\":\"image\"}',
    1,
    1,
    '2021-08-06 21:25:35',
    '2021-08-06 21:25:35'
  );
INSERT INTO
  `upload_file` (
    `id`,
    `name`,
    `alternativeText`,
    `caption`,
    `width`,
    `height`,
    `formats`,
    `hash`,
    `ext`,
    `mime`,
    `size`,
    `url`,
    `previewUrl`,
    `provider`,
    `provider_metadata`,
    `created_by`,
    `updated_by`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    26,
    'z6.jpg',
    '',
    '',
    1189,
    669,
    '{\"thumbnail\":{\"name\":\"thumbnail_z6.jpg\",\"hash\":\"thumbnail_z6_ba5b381107\",\"ext\":\".jpg\",\"mime\":\"image/jpeg\",\"width\":245,\"height\":138,\"size\":8.23,\"path\":null,\"url\":\"https://res.cloudinary.com/dpv0ukspz/image/upload/v1628285245/thumbnail_z6_ba5b381107.jpg\",\"provider_metadata\":{\"public_id\":\"thumbnail_z6_ba5b381107\",\"resource_type\":\"image\"}},\"large\":{\"name\":\"large_z6.jpg\",\"hash\":\"large_z6_ba5b381107\",\"ext\":\".jpg\",\"mime\":\"image/jpeg\",\"width\":1000,\"height\":563,\"size\":93.34,\"path\":null,\"url\":\"https://res.cloudinary.com/dpv0ukspz/image/upload/v1628285246/large_z6_ba5b381107.jpg\",\"provider_metadata\":{\"public_id\":\"large_z6_ba5b381107\",\"resource_type\":\"image\"}},\"medium\":{\"name\":\"medium_z6.jpg\",\"hash\":\"medium_z6_ba5b381107\",\"ext\":\".jpg\",\"mime\":\"image/jpeg\",\"width\":750,\"height\":422,\"size\":57.18,\"path\":null,\"url\":\"https://res.cloudinary.com/dpv0ukspz/image/upload/v1628285247/medium_z6_ba5b381107.jpg\",\"provider_metadata\":{\"public_id\":\"medium_z6_ba5b381107\",\"resource_type\":\"image\"}},\"small\":{\"name\":\"small_z6.jpg\",\"hash\":\"small_z6_ba5b381107\",\"ext\":\".jpg\",\"mime\":\"image/jpeg\",\"width\":500,\"height\":281,\"size\":27.7,\"path\":null,\"url\":\"https://res.cloudinary.com/dpv0ukspz/image/upload/v1628285248/small_z6_ba5b381107.jpg\",\"provider_metadata\":{\"public_id\":\"small_z6_ba5b381107\",\"resource_type\":\"image\"}}}',
    'z6_ba5b381107',
    '.jpg',
    'image/jpeg',
    124.03,
    'https://res.cloudinary.com/dpv0ukspz/image/upload/v1628285243/z6_ba5b381107.jpg',
    NULL,
    'cloudinary',
    '{\"public_id\":\"z6_ba5b381107\",\"resource_type\":\"image\"}',
    1,
    1,
    '2021-08-06 21:27:28',
    '2021-08-06 21:27:29'
  );
INSERT INTO
  `upload_file` (
    `id`,
    `name`,
    `alternativeText`,
    `caption`,
    `width`,
    `height`,
    `formats`,
    `hash`,
    `ext`,
    `mime`,
    `size`,
    `url`,
    `previewUrl`,
    `provider`,
    `provider_metadata`,
    `created_by`,
    `updated_by`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    27,
    'z7.jpg',
    '',
    '',
    1189,
    669,
    '{\"thumbnail\":{\"name\":\"thumbnail_z7.jpg\",\"hash\":\"thumbnail_z7_6713ef4a14\",\"ext\":\".jpg\",\"mime\":\"image/jpeg\",\"width\":245,\"height\":138,\"size\":8.32,\"path\":null,\"url\":\"https://res.cloudinary.com/dpv0ukspz/image/upload/v1628285313/thumbnail_z7_6713ef4a14.jpg\",\"provider_metadata\":{\"public_id\":\"thumbnail_z7_6713ef4a14\",\"resource_type\":\"image\"}},\"large\":{\"name\":\"large_z7.jpg\",\"hash\":\"large_z7_6713ef4a14\",\"ext\":\".jpg\",\"mime\":\"image/jpeg\",\"width\":1000,\"height\":563,\"size\":114.99,\"path\":null,\"url\":\"https://res.cloudinary.com/dpv0ukspz/image/upload/v1628285314/large_z7_6713ef4a14.jpg\",\"provider_metadata\":{\"public_id\":\"large_z7_6713ef4a14\",\"resource_type\":\"image\"}},\"medium\":{\"name\":\"medium_z7.jpg\",\"hash\":\"medium_z7_6713ef4a14\",\"ext\":\".jpg\",\"mime\":\"image/jpeg\",\"width\":750,\"height\":422,\"size\":67.54,\"path\":null,\"url\":\"https://res.cloudinary.com/dpv0ukspz/image/upload/v1628285315/medium_z7_6713ef4a14.jpg\",\"provider_metadata\":{\"public_id\":\"medium_z7_6713ef4a14\",\"resource_type\":\"image\"}},\"small\":{\"name\":\"small_z7.jpg\",\"hash\":\"small_z7_6713ef4a14\",\"ext\":\".jpg\",\"mime\":\"image/jpeg\",\"width\":500,\"height\":281,\"size\":30.65,\"path\":null,\"url\":\"https://res.cloudinary.com/dpv0ukspz/image/upload/v1628285316/small_z7_6713ef4a14.jpg\",\"provider_metadata\":{\"public_id\":\"small_z7_6713ef4a14\",\"resource_type\":\"image\"}}}',
    'z7_6713ef4a14',
    '.jpg',
    'image/jpeg',
    158.62,
    'https://res.cloudinary.com/dpv0ukspz/image/upload/v1628285313/z7_6713ef4a14.jpg',
    NULL,
    'cloudinary',
    '{\"public_id\":\"z7_6713ef4a14\",\"resource_type\":\"image\"}',
    1,
    1,
    '2021-08-06 21:28:37',
    '2021-08-06 21:28:37'
  );
INSERT INTO
  `upload_file` (
    `id`,
    `name`,
    `alternativeText`,
    `caption`,
    `width`,
    `height`,
    `formats`,
    `hash`,
    `ext`,
    `mime`,
    `size`,
    `url`,
    `previewUrl`,
    `provider`,
    `provider_metadata`,
    `created_by`,
    `updated_by`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    28,
    'z8.jpg',
    '',
    '',
    633,
    952,
    '{\"thumbnail\":{\"name\":\"thumbnail_z8.jpg\",\"hash\":\"thumbnail_z8_a5b2f1a5a3\",\"ext\":\".jpg\",\"mime\":\"image/jpeg\",\"width\":104,\"height\":156,\"size\":3.75,\"path\":null,\"url\":\"https://res.cloudinary.com/dpv0ukspz/image/upload/v1628285370/thumbnail_z8_a5b2f1a5a3.jpg\",\"provider_metadata\":{\"public_id\":\"thumbnail_z8_a5b2f1a5a3\",\"resource_type\":\"image\"}},\"medium\":{\"name\":\"medium_z8.jpg\",\"hash\":\"medium_z8_a5b2f1a5a3\",\"ext\":\".jpg\",\"mime\":\"image/jpeg\",\"width\":499,\"height\":750,\"size\":63.13,\"path\":null,\"url\":\"https://res.cloudinary.com/dpv0ukspz/image/upload/v1628285371/medium_z8_a5b2f1a5a3.jpg\",\"provider_metadata\":{\"public_id\":\"medium_z8_a5b2f1a5a3\",\"resource_type\":\"image\"}},\"small\":{\"name\":\"small_z8.jpg\",\"hash\":\"small_z8_a5b2f1a5a3\",\"ext\":\".jpg\",\"mime\":\"image/jpeg\",\"width\":332,\"height\":500,\"size\":29.79,\"path\":null,\"url\":\"https://res.cloudinary.com/dpv0ukspz/image/upload/v1628285372/small_z8_a5b2f1a5a3.jpg\",\"provider_metadata\":{\"public_id\":\"small_z8_a5b2f1a5a3\",\"resource_type\":\"image\"}}}',
    'z8_a5b2f1a5a3',
    '.jpg',
    'image/jpeg',
    100.74,
    'https://res.cloudinary.com/dpv0ukspz/image/upload/v1628285369/z8_a5b2f1a5a3.jpg',
    NULL,
    'cloudinary',
    '{\"public_id\":\"z8_a5b2f1a5a3\",\"resource_type\":\"image\"}',
    1,
    1,
    '2021-08-06 21:29:33',
    '2021-08-06 21:29:33'
  );
INSERT INTO
  `upload_file` (
    `id`,
    `name`,
    `alternativeText`,
    `caption`,
    `width`,
    `height`,
    `formats`,
    `hash`,
    `ext`,
    `mime`,
    `size`,
    `url`,
    `previewUrl`,
    `provider`,
    `provider_metadata`,
    `created_by`,
    `updated_by`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    29,
    'z9.jpg',
    '',
    '',
    1050,
    700,
    '{\"thumbnail\":{\"name\":\"thumbnail_z9.jpg\",\"hash\":\"thumbnail_z9_deb898e409\",\"ext\":\".jpg\",\"mime\":\"image/jpeg\",\"width\":234,\"height\":156,\"size\":4.97,\"path\":null,\"url\":\"https://res.cloudinary.com/dpv0ukspz/image/upload/v1628285428/thumbnail_z9_deb898e409.jpg\",\"provider_metadata\":{\"public_id\":\"thumbnail_z9_deb898e409\",\"resource_type\":\"image\"}},\"large\":{\"name\":\"large_z9.jpg\",\"hash\":\"large_z9_deb898e409\",\"ext\":\".jpg\",\"mime\":\"image/jpeg\",\"width\":1000,\"height\":667,\"size\":70.83,\"path\":null,\"url\":\"https://res.cloudinary.com/dpv0ukspz/image/upload/v1628285428/large_z9_deb898e409.jpg\",\"provider_metadata\":{\"public_id\":\"large_z9_deb898e409\",\"resource_type\":\"image\"}},\"medium\":{\"name\":\"medium_z9.jpg\",\"hash\":\"medium_z9_deb898e409\",\"ext\":\".jpg\",\"mime\":\"image/jpeg\",\"width\":750,\"height\":500,\"size\":40.93,\"path\":null,\"url\":\"https://res.cloudinary.com/dpv0ukspz/image/upload/v1628285429/medium_z9_deb898e409.jpg\",\"provider_metadata\":{\"public_id\":\"medium_z9_deb898e409\",\"resource_type\":\"image\"}},\"small\":{\"name\":\"small_z9.jpg\",\"hash\":\"small_z9_deb898e409\",\"ext\":\".jpg\",\"mime\":\"image/jpeg\",\"width\":500,\"height\":333,\"size\":17.99,\"path\":null,\"url\":\"https://res.cloudinary.com/dpv0ukspz/image/upload/v1628285430/small_z9_deb898e409.jpg\",\"provider_metadata\":{\"public_id\":\"small_z9_deb898e409\",\"resource_type\":\"image\"}}}',
    'z9_deb898e409',
    '.jpg',
    'image/jpeg',
    79.65,
    'https://res.cloudinary.com/dpv0ukspz/image/upload/v1628285427/z9_deb898e409.jpg',
    NULL,
    'cloudinary',
    '{\"public_id\":\"z9_deb898e409\",\"resource_type\":\"image\"}',
    1,
    1,
    '2021-08-06 21:30:31',
    '2021-08-06 21:30:31'
  );
INSERT INTO
  `upload_file` (
    `id`,
    `name`,
    `alternativeText`,
    `caption`,
    `width`,
    `height`,
    `formats`,
    `hash`,
    `ext`,
    `mime`,
    `size`,
    `url`,
    `previewUrl`,
    `provider`,
    `provider_metadata`,
    `created_by`,
    `updated_by`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    30,
    'z10.jpg',
    '',
    '',
    1051,
    700,
    '{\"thumbnail\":{\"name\":\"thumbnail_z10.jpg\",\"hash\":\"thumbnail_z10_55265417d9\",\"ext\":\".jpg\",\"mime\":\"image/jpeg\",\"width\":234,\"height\":156,\"size\":4.63,\"path\":null,\"url\":\"https://res.cloudinary.com/dpv0ukspz/image/upload/v1628285543/thumbnail_z10_55265417d9.jpg\",\"provider_metadata\":{\"public_id\":\"thumbnail_z10_55265417d9\",\"resource_type\":\"image\"}},\"large\":{\"name\":\"large_z10.jpg\",\"hash\":\"large_z10_55265417d9\",\"ext\":\".jpg\",\"mime\":\"image/jpeg\",\"width\":1000,\"height\":666,\"size\":43.68,\"path\":null,\"url\":\"https://res.cloudinary.com/dpv0ukspz/image/upload/v1628285544/large_z10_55265417d9.jpg\",\"provider_metadata\":{\"public_id\":\"large_z10_55265417d9\",\"resource_type\":\"image\"}},\"medium\":{\"name\":\"medium_z10.jpg\",\"hash\":\"medium_z10_55265417d9\",\"ext\":\".jpg\",\"mime\":\"image/jpeg\",\"width\":750,\"height\":500,\"size\":28.43,\"path\":null,\"url\":\"https://res.cloudinary.com/dpv0ukspz/image/upload/v1628285545/medium_z10_55265417d9.jpg\",\"provider_metadata\":{\"public_id\":\"medium_z10_55265417d9\",\"resource_type\":\"image\"}},\"small\":{\"name\":\"small_z10.jpg\",\"hash\":\"small_z10_55265417d9\",\"ext\":\".jpg\",\"mime\":\"image/jpeg\",\"width\":500,\"height\":333,\"size\":14.8,\"path\":null,\"url\":\"https://res.cloudinary.com/dpv0ukspz/image/upload/v1628285546/small_z10_55265417d9.jpg\",\"provider_metadata\":{\"public_id\":\"small_z10_55265417d9\",\"resource_type\":\"image\"}}}',
    'z10_55265417d9',
    '.jpg',
    'image/jpeg',
    46.16,
    'https://res.cloudinary.com/dpv0ukspz/image/upload/v1628285542/z10_55265417d9.jpg',
    NULL,
    'cloudinary',
    '{\"public_id\":\"z10_55265417d9\",\"resource_type\":\"image\"}',
    1,
    1,
    '2021-08-06 21:32:26',
    '2021-08-06 21:32:26'
  );
INSERT INTO
  `upload_file` (
    `id`,
    `name`,
    `alternativeText`,
    `caption`,
    `width`,
    `height`,
    `formats`,
    `hash`,
    `ext`,
    `mime`,
    `size`,
    `url`,
    `previewUrl`,
    `provider`,
    `provider_metadata`,
    `created_by`,
    `updated_by`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    31,
    'z11.jpg',
    '',
    '',
    634,
    951,
    '{\"thumbnail\":{\"name\":\"thumbnail_z11.jpg\",\"hash\":\"thumbnail_z11_27a6cc21ca\",\"ext\":\".jpg\",\"mime\":\"image/jpeg\",\"width\":104,\"height\":156,\"size\":4.48,\"path\":null,\"url\":\"https://res.cloudinary.com/dpv0ukspz/image/upload/v1628285589/thumbnail_z11_27a6cc21ca.jpg\",\"provider_metadata\":{\"public_id\":\"thumbnail_z11_27a6cc21ca\",\"resource_type\":\"image\"}},\"medium\":{\"name\":\"medium_z11.jpg\",\"hash\":\"medium_z11_27a6cc21ca\",\"ext\":\".jpg\",\"mime\":\"image/jpeg\",\"width\":500,\"height\":750,\"size\":95.82,\"path\":null,\"url\":\"https://res.cloudinary.com/dpv0ukspz/image/upload/v1628285590/medium_z11_27a6cc21ca.jpg\",\"provider_metadata\":{\"public_id\":\"medium_z11_27a6cc21ca\",\"resource_type\":\"image\"}},\"small\":{\"name\":\"small_z11.jpg\",\"hash\":\"small_z11_27a6cc21ca\",\"ext\":\".jpg\",\"mime\":\"image/jpeg\",\"width\":333,\"height\":500,\"size\":44.56,\"path\":null,\"url\":\"https://res.cloudinary.com/dpv0ukspz/image/upload/v1628285591/small_z11_27a6cc21ca.jpg\",\"provider_metadata\":{\"public_id\":\"small_z11_27a6cc21ca\",\"resource_type\":\"image\"}}}',
    'z11_27a6cc21ca',
    '.jpg',
    'image/jpeg',
    146.70,
    'https://res.cloudinary.com/dpv0ukspz/image/upload/v1628285588/z11_27a6cc21ca.jpg',
    NULL,
    'cloudinary',
    '{\"public_id\":\"z11_27a6cc21ca\",\"resource_type\":\"image\"}',
    1,
    1,
    '2021-08-06 21:33:12',
    '2021-08-06 21:33:12'
  );
INSERT INTO
  `upload_file` (
    `id`,
    `name`,
    `alternativeText`,
    `caption`,
    `width`,
    `height`,
    `formats`,
    `hash`,
    `ext`,
    `mime`,
    `size`,
    `url`,
    `previewUrl`,
    `provider`,
    `provider_metadata`,
    `created_by`,
    `updated_by`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    32,
    'z12.jpg',
    '',
    '',
    634,
    950,
    '{\"thumbnail\":{\"name\":\"thumbnail_z12.jpg\",\"hash\":\"thumbnail_z12_e46b0dd01d\",\"ext\":\".jpg\",\"mime\":\"image/jpeg\",\"width\":104,\"height\":156,\"size\":3.42,\"path\":null,\"url\":\"https://res.cloudinary.com/dpv0ukspz/image/upload/v1628286076/thumbnail_z12_e46b0dd01d.jpg\",\"provider_metadata\":{\"public_id\":\"thumbnail_z12_e46b0dd01d\",\"resource_type\":\"image\"}},\"medium\":{\"name\":\"medium_z12.jpg\",\"hash\":\"medium_z12_e46b0dd01d\",\"ext\":\".jpg\",\"mime\":\"image/jpeg\",\"width\":501,\"height\":750,\"size\":96.3,\"path\":null,\"url\":\"https://res.cloudinary.com/dpv0ukspz/image/upload/v1628286077/medium_z12_e46b0dd01d.jpg\",\"provider_metadata\":{\"public_id\":\"medium_z12_e46b0dd01d\",\"resource_type\":\"image\"}},\"small\":{\"name\":\"small_z12.jpg\",\"hash\":\"small_z12_e46b0dd01d\",\"ext\":\".jpg\",\"mime\":\"image/jpeg\",\"width\":334,\"height\":500,\"size\":39.1,\"path\":null,\"url\":\"https://res.cloudinary.com/dpv0ukspz/image/upload/v1628286077/small_z12_e46b0dd01d.jpg\",\"provider_metadata\":{\"public_id\":\"small_z12_e46b0dd01d\",\"resource_type\":\"image\"}}}',
    'z12_e46b0dd01d',
    '.jpg',
    'image/jpeg',
    157.71,
    'https://res.cloudinary.com/dpv0ukspz/image/upload/v1628286075/z12_e46b0dd01d.jpg',
    NULL,
    'cloudinary',
    '{\"public_id\":\"z12_e46b0dd01d\",\"resource_type\":\"image\"}',
    1,
    1,
    '2021-08-06 21:41:18',
    '2021-08-06 21:41:18'
  );
INSERT INTO
  `upload_file` (
    `id`,
    `name`,
    `alternativeText`,
    `caption`,
    `width`,
    `height`,
    `formats`,
    `hash`,
    `ext`,
    `mime`,
    `size`,
    `url`,
    `previewUrl`,
    `provider`,
    `provider_metadata`,
    `created_by`,
    `updated_by`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    33,
    'z13.jpg',
    '',
    '',
    634,
    500,
    '{\"thumbnail\":{\"name\":\"thumbnail_z13.jpg\",\"hash\":\"thumbnail_z13_33e24df5b9\",\"ext\":\".jpg\",\"mime\":\"image/jpeg\",\"width\":198,\"height\":156,\"size\":7.01,\"path\":null,\"url\":\"https://res.cloudinary.com/dpv0ukspz/image/upload/v1628286210/thumbnail_z13_33e24df5b9.jpg\",\"provider_metadata\":{\"public_id\":\"thumbnail_z13_33e24df5b9\",\"resource_type\":\"image\"}},\"small\":{\"name\":\"small_z13.jpg\",\"hash\":\"small_z13_33e24df5b9\",\"ext\":\".jpg\",\"mime\":\"image/jpeg\",\"width\":500,\"height\":394,\"size\":27.45,\"path\":null,\"url\":\"https://res.cloudinary.com/dpv0ukspz/image/upload/v1628286211/small_z13_33e24df5b9.jpg\",\"provider_metadata\":{\"public_id\":\"small_z13_33e24df5b9\",\"resource_type\":\"image\"}}}',
    'z13_33e24df5b9',
    '.jpg',
    'image/jpeg',
    39.43,
    'https://res.cloudinary.com/dpv0ukspz/image/upload/v1628286209/z13_33e24df5b9.jpg',
    NULL,
    'cloudinary',
    '{\"public_id\":\"z13_33e24df5b9\",\"resource_type\":\"image\"}',
    1,
    1,
    '2021-08-06 21:43:32',
    '2021-08-06 21:43:32'
  );
INSERT INTO
  `upload_file` (
    `id`,
    `name`,
    `alternativeText`,
    `caption`,
    `width`,
    `height`,
    `formats`,
    `hash`,
    `ext`,
    `mime`,
    `size`,
    `url`,
    `previewUrl`,
    `provider`,
    `provider_metadata`,
    `created_by`,
    `updated_by`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    34,
    'z14.jpg',
    '',
    '',
    634,
    950,
    '{\"thumbnail\":{\"name\":\"thumbnail_z14.jpg\",\"hash\":\"thumbnail_z14_224d2a947c\",\"ext\":\".jpg\",\"mime\":\"image/jpeg\",\"width\":104,\"height\":156,\"size\":2.91,\"path\":null,\"url\":\"https://res.cloudinary.com/dpv0ukspz/image/upload/v1628286326/thumbnail_z14_224d2a947c.jpg\",\"provider_metadata\":{\"public_id\":\"thumbnail_z14_224d2a947c\",\"resource_type\":\"image\"}},\"medium\":{\"name\":\"medium_z14.jpg\",\"hash\":\"medium_z14_224d2a947c\",\"ext\":\".jpg\",\"mime\":\"image/jpeg\",\"width\":501,\"height\":750,\"size\":35.56,\"path\":null,\"url\":\"https://res.cloudinary.com/dpv0ukspz/image/upload/v1628286326/medium_z14_224d2a947c.jpg\",\"provider_metadata\":{\"public_id\":\"medium_z14_224d2a947c\",\"resource_type\":\"image\"}},\"small\":{\"name\":\"small_z14.jpg\",\"hash\":\"small_z14_224d2a947c\",\"ext\":\".jpg\",\"mime\":\"image/jpeg\",\"width\":334,\"height\":500,\"size\":18.96,\"path\":null,\"url\":\"https://res.cloudinary.com/dpv0ukspz/image/upload/v1628286327/small_z14_224d2a947c.jpg\",\"provider_metadata\":{\"public_id\":\"small_z14_224d2a947c\",\"resource_type\":\"image\"}}}',
    'z14_224d2a947c',
    '.jpg',
    'image/jpeg',
    50.44,
    'https://res.cloudinary.com/dpv0ukspz/image/upload/v1628286325/z14_224d2a947c.jpg',
    NULL,
    'cloudinary',
    '{\"public_id\":\"z14_224d2a947c\",\"resource_type\":\"image\"}',
    1,
    1,
    '2021-08-06 21:45:28',
    '2021-08-06 21:45:28'
  );
INSERT INTO
  `upload_file` (
    `id`,
    `name`,
    `alternativeText`,
    `caption`,
    `width`,
    `height`,
    `formats`,
    `hash`,
    `ext`,
    `mime`,
    `size`,
    `url`,
    `previewUrl`,
    `provider`,
    `provider_metadata`,
    `created_by`,
    `updated_by`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    35,
    '15.jpg',
    '',
    '',
    634,
    951,
    '{\"thumbnail\":{\"name\":\"thumbnail_15.jpg\",\"hash\":\"thumbnail_15_bac5879a81\",\"ext\":\".jpg\",\"mime\":\"image/jpeg\",\"width\":104,\"height\":156,\"size\":4.28,\"path\":null,\"url\":\"https://res.cloudinary.com/dpv0ukspz/image/upload/v1628286449/thumbnail_15_bac5879a81.jpg\",\"provider_metadata\":{\"public_id\":\"thumbnail_15_bac5879a81\",\"resource_type\":\"image\"}},\"medium\":{\"name\":\"medium_15.jpg\",\"hash\":\"medium_15_bac5879a81\",\"ext\":\".jpg\",\"mime\":\"image/jpeg\",\"width\":500,\"height\":750,\"size\":57.79,\"path\":null,\"url\":\"https://res.cloudinary.com/dpv0ukspz/image/upload/v1628286450/medium_15_bac5879a81.jpg\",\"provider_metadata\":{\"public_id\":\"medium_15_bac5879a81\",\"resource_type\":\"image\"}},\"small\":{\"name\":\"small_15.jpg\",\"hash\":\"small_15_bac5879a81\",\"ext\":\".jpg\",\"mime\":\"image/jpeg\",\"width\":333,\"height\":500,\"size\":28.61,\"path\":null,\"url\":\"https://res.cloudinary.com/dpv0ukspz/image/upload/v1628286451/small_15_bac5879a81.jpg\",\"provider_metadata\":{\"public_id\":\"small_15_bac5879a81\",\"resource_type\":\"image\"}}}',
    '15_bac5879a81',
    '.jpg',
    'image/jpeg',
    86.49,
    'https://res.cloudinary.com/dpv0ukspz/image/upload/v1628286447/15_bac5879a81.jpg',
    NULL,
    'cloudinary',
    '{\"public_id\":\"15_bac5879a81\",\"resource_type\":\"image\"}',
    1,
    1,
    '2021-08-06 21:47:31',
    '2021-08-06 21:47:31'
  );
INSERT INTO
  `upload_file` (
    `id`,
    `name`,
    `alternativeText`,
    `caption`,
    `width`,
    `height`,
    `formats`,
    `hash`,
    `ext`,
    `mime`,
    `size`,
    `url`,
    `previewUrl`,
    `provider`,
    `provider_metadata`,
    `created_by`,
    `updated_by`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    36,
    'z15.jpg',
    '',
    '',
    1050,
    700,
    '{\"thumbnail\":{\"name\":\"thumbnail_z15.jpg\",\"hash\":\"thumbnail_z15_f0b44a9ff6\",\"ext\":\".jpg\",\"mime\":\"image/jpeg\",\"width\":234,\"height\":156,\"size\":7.25,\"path\":null,\"url\":\"https://res.cloudinary.com/dpv0ukspz/image/upload/v1628338790/thumbnail_z15_f0b44a9ff6.jpg\",\"provider_metadata\":{\"public_id\":\"thumbnail_z15_f0b44a9ff6\",\"resource_type\":\"image\"}},\"large\":{\"name\":\"large_z15.jpg\",\"hash\":\"large_z15_f0b44a9ff6\",\"ext\":\".jpg\",\"mime\":\"image/jpeg\",\"width\":1000,\"height\":667,\"size\":101.9,\"path\":null,\"url\":\"https://res.cloudinary.com/dpv0ukspz/image/upload/v1628338791/large_z15_f0b44a9ff6.jpg\",\"provider_metadata\":{\"public_id\":\"large_z15_f0b44a9ff6\",\"resource_type\":\"image\"}},\"medium\":{\"name\":\"medium_z15.jpg\",\"hash\":\"medium_z15_f0b44a9ff6\",\"ext\":\".jpg\",\"mime\":\"image/jpeg\",\"width\":750,\"height\":500,\"size\":59.89,\"path\":null,\"url\":\"https://res.cloudinary.com/dpv0ukspz/image/upload/v1628338792/medium_z15_f0b44a9ff6.jpg\",\"provider_metadata\":{\"public_id\":\"medium_z15_f0b44a9ff6\",\"resource_type\":\"image\"}},\"small\":{\"name\":\"small_z15.jpg\",\"hash\":\"small_z15_f0b44a9ff6\",\"ext\":\".jpg\",\"mime\":\"image/jpeg\",\"width\":500,\"height\":333,\"size\":26.85,\"path\":null,\"url\":\"https://res.cloudinary.com/dpv0ukspz/image/upload/v1628338793/small_z15_f0b44a9ff6.jpg\",\"provider_metadata\":{\"public_id\":\"small_z15_f0b44a9ff6\",\"resource_type\":\"image\"}}}',
    'z15_f0b44a9ff6',
    '.jpg',
    'image/jpeg',
    112.59,
    'https://res.cloudinary.com/dpv0ukspz/image/upload/v1628338789/z15_f0b44a9ff6.jpg',
    NULL,
    'cloudinary',
    '{\"public_id\":\"z15_f0b44a9ff6\",\"resource_type\":\"image\"}',
    1,
    1,
    '2021-08-07 12:19:53',
    '2021-08-07 12:19:53'
  );
INSERT INTO
  `upload_file` (
    `id`,
    `name`,
    `alternativeText`,
    `caption`,
    `width`,
    `height`,
    `formats`,
    `hash`,
    `ext`,
    `mime`,
    `size`,
    `url`,
    `previewUrl`,
    `provider`,
    `provider_metadata`,
    `created_by`,
    `updated_by`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    37,
    'zz1.png',
    '',
    '',
    1774,
    938,
    '{\"thumbnail\":{\"name\":\"thumbnail_zz1.png\",\"hash\":\"thumbnail_zz1_01a4e9af4d\",\"ext\":\".png\",\"mime\":\"image/png\",\"width\":245,\"height\":130,\"size\":31.32,\"path\":null,\"url\":\"https://res.cloudinary.com/dpv0ukspz/image/upload/v1628344016/thumbnail_zz1_01a4e9af4d.png\",\"provider_metadata\":{\"public_id\":\"thumbnail_zz1_01a4e9af4d\",\"resource_type\":\"image\"}},\"large\":{\"name\":\"large_zz1.png\",\"hash\":\"large_zz1_01a4e9af4d\",\"ext\":\".png\",\"mime\":\"image/png\",\"width\":1000,\"height\":529,\"size\":344.54,\"path\":null,\"url\":\"https://res.cloudinary.com/dpv0ukspz/image/upload/v1628344018/large_zz1_01a4e9af4d.png\",\"provider_metadata\":{\"public_id\":\"large_zz1_01a4e9af4d\",\"resource_type\":\"image\"}},\"medium\":{\"name\":\"medium_zz1.png\",\"hash\":\"medium_zz1_01a4e9af4d\",\"ext\":\".png\",\"mime\":\"image/png\",\"width\":750,\"height\":397,\"size\":210.48,\"path\":null,\"url\":\"https://res.cloudinary.com/dpv0ukspz/image/upload/v1628344019/medium_zz1_01a4e9af4d.png\",\"provider_metadata\":{\"public_id\":\"medium_zz1_01a4e9af4d\",\"resource_type\":\"image\"}},\"small\":{\"name\":\"small_zz1.png\",\"hash\":\"small_zz1_01a4e9af4d\",\"ext\":\".png\",\"mime\":\"image/png\",\"width\":500,\"height\":264,\"size\":105.22,\"path\":null,\"url\":\"https://res.cloudinary.com/dpv0ukspz/image/upload/v1628344020/small_zz1_01a4e9af4d.png\",\"provider_metadata\":{\"public_id\":\"small_zz1_01a4e9af4d\",\"resource_type\":\"image\"}}}',
    'zz1_01a4e9af4d',
    '.png',
    'image/png',
    830.84,
    'https://res.cloudinary.com/dpv0ukspz/image/upload/v1628344015/zz1_01a4e9af4d.png',
    NULL,
    'cloudinary',
    '{\"public_id\":\"zz1_01a4e9af4d\",\"resource_type\":\"image\"}',
    1,
    1,
    '2021-08-07 13:47:01',
    '2021-08-07 13:47:01'
  );
INSERT INTO
  `upload_file` (
    `id`,
    `name`,
    `alternativeText`,
    `caption`,
    `width`,
    `height`,
    `formats`,
    `hash`,
    `ext`,
    `mime`,
    `size`,
    `url`,
    `previewUrl`,
    `provider`,
    `provider_metadata`,
    `created_by`,
    `updated_by`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    38,
    '1.jpg',
    '',
    '',
    500,
    750,
    '{\"thumbnail\":{\"name\":\"thumbnail_1.jpg\",\"hash\":\"thumbnail_1_1805071442\",\"ext\":\".jpg\",\"mime\":\"image/jpeg\",\"width\":104,\"height\":156,\"size\":3,\"path\":null,\"url\":\"https://res.cloudinary.com/dpv0ukspz/image/upload/v1629888108/thumbnail_1_1805071442.jpg\",\"provider_metadata\":{\"public_id\":\"thumbnail_1_1805071442\",\"resource_type\":\"image\"}},\"small\":{\"name\":\"small_1.jpg\",\"hash\":\"small_1_1805071442\",\"ext\":\".jpg\",\"mime\":\"image/jpeg\",\"width\":333,\"height\":500,\"size\":19.77,\"path\":null,\"url\":\"https://res.cloudinary.com/dpv0ukspz/image/upload/v1629888109/small_1_1805071442.jpg\",\"provider_metadata\":{\"public_id\":\"small_1_1805071442\",\"resource_type\":\"image\"}}}',
    '1_1805071442',
    '.jpg',
    'image/jpeg',
    35.07,
    'https://res.cloudinary.com/dpv0ukspz/image/upload/v1629888107/1_1805071442.jpg',
    NULL,
    'cloudinary',
    '{\"public_id\":\"1_1805071442\",\"resource_type\":\"image\"}',
    1,
    1,
    '2021-08-25 10:41:50',
    '2021-08-25 10:41:50'
  );
INSERT INTO
  `upload_file` (
    `id`,
    `name`,
    `alternativeText`,
    `caption`,
    `width`,
    `height`,
    `formats`,
    `hash`,
    `ext`,
    `mime`,
    `size`,
    `url`,
    `previewUrl`,
    `provider`,
    `provider_metadata`,
    `created_by`,
    `updated_by`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    39,
    '18.jpg',
    '',
    '',
    1049,
    701,
    '{\"thumbnail\":{\"name\":\"thumbnail_18.jpg\",\"hash\":\"thumbnail_18_daad0ac083\",\"ext\":\".jpg\",\"mime\":\"image/jpeg\",\"width\":233,\"height\":156,\"size\":9.19,\"path\":null,\"url\":\"https://res.cloudinary.com/dpv0ukspz/image/upload/v1629888127/thumbnail_18_daad0ac083.jpg\",\"provider_metadata\":{\"public_id\":\"thumbnail_18_daad0ac083\",\"resource_type\":\"image\"}},\"large\":{\"name\":\"large_18.jpg\",\"hash\":\"large_18_daad0ac083\",\"ext\":\".jpg\",\"mime\":\"image/jpeg\",\"width\":1000,\"height\":668,\"size\":121.87,\"path\":null,\"url\":\"https://res.cloudinary.com/dpv0ukspz/image/upload/v1629888128/large_18_daad0ac083.jpg\",\"provider_metadata\":{\"public_id\":\"large_18_daad0ac083\",\"resource_type\":\"image\"}},\"medium\":{\"name\":\"medium_18.jpg\",\"hash\":\"medium_18_daad0ac083\",\"ext\":\".jpg\",\"mime\":\"image/jpeg\",\"width\":750,\"height\":501,\"size\":75.81,\"path\":null,\"url\":\"https://res.cloudinary.com/dpv0ukspz/image/upload/v1629888128/medium_18_daad0ac083.jpg\",\"provider_metadata\":{\"public_id\":\"medium_18_daad0ac083\",\"resource_type\":\"image\"}},\"small\":{\"name\":\"small_18.jpg\",\"hash\":\"small_18_daad0ac083\",\"ext\":\".jpg\",\"mime\":\"image/jpeg\",\"width\":500,\"height\":334,\"size\":35.9,\"path\":null,\"url\":\"https://res.cloudinary.com/dpv0ukspz/image/upload/v1629888129/small_18_daad0ac083.jpg\",\"provider_metadata\":{\"public_id\":\"small_18_daad0ac083\",\"resource_type\":\"image\"}}}',
    '18_daad0ac083',
    '.jpg',
    'image/jpeg',
    134.04,
    'https://res.cloudinary.com/dpv0ukspz/image/upload/v1629888126/18_daad0ac083.jpg',
    NULL,
    'cloudinary',
    '{\"public_id\":\"18_daad0ac083\",\"resource_type\":\"image\"}',
    1,
    1,
    '2021-08-25 10:42:10',
    '2021-08-25 10:42:10'
  );
INSERT INTO
  `upload_file` (
    `id`,
    `name`,
    `alternativeText`,
    `caption`,
    `width`,
    `height`,
    `formats`,
    `hash`,
    `ext`,
    `mime`,
    `size`,
    `url`,
    `previewUrl`,
    `provider`,
    `provider_metadata`,
    `created_by`,
    `updated_by`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    40,
    '2.jpg',
    '',
    '',
    632,
    954,
    '{\"thumbnail\":{\"name\":\"thumbnail_2.jpg\",\"hash\":\"thumbnail_2_fbc35e4fed\",\"ext\":\".jpg\",\"mime\":\"image/jpeg\",\"width\":103,\"height\":156,\"size\":4.08,\"path\":null,\"url\":\"https://res.cloudinary.com/dpv0ukspz/image/upload/v1629888152/thumbnail_2_fbc35e4fed.jpg\",\"provider_metadata\":{\"public_id\":\"thumbnail_2_fbc35e4fed\",\"resource_type\":\"image\"}},\"medium\":{\"name\":\"medium_2.jpg\",\"hash\":\"medium_2_fbc35e4fed\",\"ext\":\".jpg\",\"mime\":\"image/jpeg\",\"width\":497,\"height\":750,\"size\":39.64,\"path\":null,\"url\":\"https://res.cloudinary.com/dpv0ukspz/image/upload/v1629888153/medium_2_fbc35e4fed.jpg\",\"provider_metadata\":{\"public_id\":\"medium_2_fbc35e4fed\",\"resource_type\":\"image\"}},\"small\":{\"name\":\"small_2.jpg\",\"hash\":\"small_2_fbc35e4fed\",\"ext\":\".jpg\",\"mime\":\"image/jpeg\",\"width\":331,\"height\":500,\"size\":22.17,\"path\":null,\"url\":\"https://res.cloudinary.com/dpv0ukspz/image/upload/v1629888153/small_2_fbc35e4fed.jpg\",\"provider_metadata\":{\"public_id\":\"small_2_fbc35e4fed\",\"resource_type\":\"image\"}}}',
    '2_fbc35e4fed',
    '.jpg',
    'image/jpeg',
    55.41,
    'https://res.cloudinary.com/dpv0ukspz/image/upload/v1629888151/2_fbc35e4fed.jpg',
    NULL,
    'cloudinary',
    '{\"public_id\":\"2_fbc35e4fed\",\"resource_type\":\"image\"}',
    1,
    1,
    '2021-08-25 10:42:35',
    '2021-08-25 10:42:35'
  );
INSERT INTO
  `upload_file` (
    `id`,
    `name`,
    `alternativeText`,
    `caption`,
    `width`,
    `height`,
    `formats`,
    `hash`,
    `ext`,
    `mime`,
    `size`,
    `url`,
    `previewUrl`,
    `provider`,
    `provider_metadata`,
    `created_by`,
    `updated_by`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    41,
    '6.jpg',
    '',
    '',
    675,
    900,
    '{\"thumbnail\":{\"name\":\"thumbnail_6.jpg\",\"hash\":\"thumbnail_6_35a6eddb6c\",\"ext\":\".jpg\",\"mime\":\"image/jpeg\",\"width\":117,\"height\":156,\"size\":5.49,\"path\":null,\"url\":\"https://res.cloudinary.com/dpv0ukspz/image/upload/v1629888178/thumbnail_6_35a6eddb6c.jpg\",\"provider_metadata\":{\"public_id\":\"thumbnail_6_35a6eddb6c\",\"resource_type\":\"image\"}},\"medium\":{\"name\":\"medium_6.jpg\",\"hash\":\"medium_6_35a6eddb6c\",\"ext\":\".jpg\",\"mime\":\"image/jpeg\",\"width\":563,\"height\":750,\"size\":69.14,\"path\":null,\"url\":\"https://res.cloudinary.com/dpv0ukspz/image/upload/v1629888179/medium_6_35a6eddb6c.jpg\",\"provider_metadata\":{\"public_id\":\"medium_6_35a6eddb6c\",\"resource_type\":\"image\"}},\"small\":{\"name\":\"small_6.jpg\",\"hash\":\"small_6_35a6eddb6c\",\"ext\":\".jpg\",\"mime\":\"image/jpeg\",\"width\":375,\"height\":500,\"size\":36.28,\"path\":null,\"url\":\"https://res.cloudinary.com/dpv0ukspz/image/upload/v1629888180/small_6_35a6eddb6c.jpg\",\"provider_metadata\":{\"public_id\":\"small_6_35a6eddb6c\",\"resource_type\":\"image\"}}}',
    '6_35a6eddb6c',
    '.jpg',
    'image/jpeg',
    91.58,
    'https://res.cloudinary.com/dpv0ukspz/image/upload/v1629888178/6_35a6eddb6c.jpg',
    NULL,
    'cloudinary',
    '{\"public_id\":\"6_35a6eddb6c\",\"resource_type\":\"image\"}',
    1,
    1,
    '2021-08-25 10:43:01',
    '2021-08-25 10:43:01'
  );
INSERT INTO
  `upload_file` (
    `id`,
    `name`,
    `alternativeText`,
    `caption`,
    `width`,
    `height`,
    `formats`,
    `hash`,
    `ext`,
    `mime`,
    `size`,
    `url`,
    `previewUrl`,
    `provider`,
    `provider_metadata`,
    `created_by`,
    `updated_by`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    42,
    '8.jpg',
    '',
    '',
    634,
    951,
    '{\"thumbnail\":{\"name\":\"thumbnail_8.jpg\",\"hash\":\"thumbnail_8_c51bde7b0f\",\"ext\":\".jpg\",\"mime\":\"image/jpeg\",\"width\":104,\"height\":156,\"size\":4.31,\"path\":null,\"url\":\"https://res.cloudinary.com/dpv0ukspz/image/upload/v1629888178/thumbnail_8_c51bde7b0f.jpg\",\"provider_metadata\":{\"public_id\":\"thumbnail_8_c51bde7b0f\",\"resource_type\":\"image\"}},\"medium\":{\"name\":\"medium_8.jpg\",\"hash\":\"medium_8_c51bde7b0f\",\"ext\":\".jpg\",\"mime\":\"image/jpeg\",\"width\":500,\"height\":750,\"size\":59.98,\"path\":null,\"url\":\"https://res.cloudinary.com/dpv0ukspz/image/upload/v1629888179/medium_8_c51bde7b0f.jpg\",\"provider_metadata\":{\"public_id\":\"medium_8_c51bde7b0f\",\"resource_type\":\"image\"}},\"small\":{\"name\":\"small_8.jpg\",\"hash\":\"small_8_c51bde7b0f\",\"ext\":\".jpg\",\"mime\":\"image/jpeg\",\"width\":333,\"height\":500,\"size\":30.76,\"path\":null,\"url\":\"https://res.cloudinary.com/dpv0ukspz/image/upload/v1629888180/small_8_c51bde7b0f.jpg\",\"provider_metadata\":{\"public_id\":\"small_8_c51bde7b0f\",\"resource_type\":\"image\"}}}',
    '8_c51bde7b0f',
    '.jpg',
    'image/jpeg',
    87.74,
    'https://res.cloudinary.com/dpv0ukspz/image/upload/v1629888178/8_c51bde7b0f.jpg',
    NULL,
    'cloudinary',
    '{\"public_id\":\"8_c51bde7b0f\",\"resource_type\":\"image\"}',
    1,
    1,
    '2021-08-25 10:43:01',
    '2021-08-25 10:43:01'
  );
INSERT INTO
  `upload_file` (
    `id`,
    `name`,
    `alternativeText`,
    `caption`,
    `width`,
    `height`,
    `formats`,
    `hash`,
    `ext`,
    `mime`,
    `size`,
    `url`,
    `previewUrl`,
    `provider`,
    `provider_metadata`,
    `created_by`,
    `updated_by`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    43,
    '5.jpg',
    '',
    '',
    675,
    900,
    '{\"thumbnail\":{\"name\":\"thumbnail_5.jpg\",\"hash\":\"thumbnail_5_0a1ec14337\",\"ext\":\".jpg\",\"mime\":\"image/jpeg\",\"width\":117,\"height\":156,\"size\":6.35,\"path\":null,\"url\":\"https://res.cloudinary.com/dpv0ukspz/image/upload/v1629888178/thumbnail_5_0a1ec14337.jpg\",\"provider_metadata\":{\"public_id\":\"thumbnail_5_0a1ec14337\",\"resource_type\":\"image\"}},\"medium\":{\"name\":\"medium_5.jpg\",\"hash\":\"medium_5_0a1ec14337\",\"ext\":\".jpg\",\"mime\":\"image/jpeg\",\"width\":563,\"height\":750,\"size\":81.87,\"path\":null,\"url\":\"https://res.cloudinary.com/dpv0ukspz/image/upload/v1629888179/medium_5_0a1ec14337.jpg\",\"provider_metadata\":{\"public_id\":\"medium_5_0a1ec14337\",\"resource_type\":\"image\"}},\"small\":{\"name\":\"small_5.jpg\",\"hash\":\"small_5_0a1ec14337\",\"ext\":\".jpg\",\"mime\":\"image/jpeg\",\"width\":375,\"height\":500,\"size\":43.31,\"path\":null,\"url\":\"https://res.cloudinary.com/dpv0ukspz/image/upload/v1629888180/small_5_0a1ec14337.jpg\",\"provider_metadata\":{\"public_id\":\"small_5_0a1ec14337\",\"resource_type\":\"image\"}}}',
    '5_0a1ec14337',
    '.jpg',
    'image/jpeg',
    110.08,
    'https://res.cloudinary.com/dpv0ukspz/image/upload/v1629888178/5_0a1ec14337.jpg',
    NULL,
    'cloudinary',
    '{\"public_id\":\"5_0a1ec14337\",\"resource_type\":\"image\"}',
    1,
    1,
    '2021-08-25 10:43:01',
    '2021-08-25 10:43:01'
  );
INSERT INTO
  `upload_file` (
    `id`,
    `name`,
    `alternativeText`,
    `caption`,
    `width`,
    `height`,
    `formats`,
    `hash`,
    `ext`,
    `mime`,
    `size`,
    `url`,
    `previewUrl`,
    `provider`,
    `provider_metadata`,
    `created_by`,
    `updated_by`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    44,
    '4.jpg',
    '',
    '',
    675,
    900,
    '{\"thumbnail\":{\"name\":\"thumbnail_4.jpg\",\"hash\":\"thumbnail_4_f3c20e45dc\",\"ext\":\".jpg\",\"mime\":\"image/jpeg\",\"width\":117,\"height\":156,\"size\":7.83,\"path\":null,\"url\":\"https://res.cloudinary.com/dpv0ukspz/image/upload/v1629888178/thumbnail_4_f3c20e45dc.jpg\",\"provider_metadata\":{\"public_id\":\"thumbnail_4_f3c20e45dc\",\"resource_type\":\"image\"}},\"medium\":{\"name\":\"medium_4.jpg\",\"hash\":\"medium_4_f3c20e45dc\",\"ext\":\".jpg\",\"mime\":\"image/jpeg\",\"width\":563,\"height\":750,\"size\":118.09,\"path\":null,\"url\":\"https://res.cloudinary.com/dpv0ukspz/image/upload/v1629888179/medium_4_f3c20e45dc.jpg\",\"provider_metadata\":{\"public_id\":\"medium_4_f3c20e45dc\",\"resource_type\":\"image\"}},\"small\":{\"name\":\"small_4.jpg\",\"hash\":\"small_4_f3c20e45dc\",\"ext\":\".jpg\",\"mime\":\"image/jpeg\",\"width\":375,\"height\":500,\"size\":59.22,\"path\":null,\"url\":\"https://res.cloudinary.com/dpv0ukspz/image/upload/v1629888180/small_4_f3c20e45dc.jpg\",\"provider_metadata\":{\"public_id\":\"small_4_f3c20e45dc\",\"resource_type\":\"image\"}}}',
    '4_f3c20e45dc',
    '.jpg',
    'image/jpeg',
    158.49,
    'https://res.cloudinary.com/dpv0ukspz/image/upload/v1629888178/4_f3c20e45dc.jpg',
    NULL,
    'cloudinary',
    '{\"public_id\":\"4_f3c20e45dc\",\"resource_type\":\"image\"}',
    1,
    1,
    '2021-08-25 10:43:01',
    '2021-08-25 10:43:01'
  );
INSERT INTO
  `upload_file` (
    `id`,
    `name`,
    `alternativeText`,
    `caption`,
    `width`,
    `height`,
    `formats`,
    `hash`,
    `ext`,
    `mime`,
    `size`,
    `url`,
    `previewUrl`,
    `provider`,
    `provider_metadata`,
    `created_by`,
    `updated_by`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    45,
    '7.jpg',
    '',
    '',
    634,
    951,
    '{\"thumbnail\":{\"name\":\"thumbnail_7.jpg\",\"hash\":\"thumbnail_7_67221e4a5a\",\"ext\":\".jpg\",\"mime\":\"image/jpeg\",\"width\":104,\"height\":156,\"size\":5.86,\"path\":null,\"url\":\"https://res.cloudinary.com/dpv0ukspz/image/upload/v1629888178/thumbnail_7_67221e4a5a.jpg\",\"provider_metadata\":{\"public_id\":\"thumbnail_7_67221e4a5a\",\"resource_type\":\"image\"}},\"medium\":{\"name\":\"medium_7.jpg\",\"hash\":\"medium_7_67221e4a5a\",\"ext\":\".jpg\",\"mime\":\"image/jpeg\",\"width\":500,\"height\":750,\"size\":99.58,\"path\":null,\"url\":\"https://res.cloudinary.com/dpv0ukspz/image/upload/v1629888179/medium_7_67221e4a5a.jpg\",\"provider_metadata\":{\"public_id\":\"medium_7_67221e4a5a\",\"resource_type\":\"image\"}},\"small\":{\"name\":\"small_7.jpg\",\"hash\":\"small_7_67221e4a5a\",\"ext\":\".jpg\",\"mime\":\"image/jpeg\",\"width\":333,\"height\":500,\"size\":48.15,\"path\":null,\"url\":\"https://res.cloudinary.com/dpv0ukspz/image/upload/v1629888180/small_7_67221e4a5a.jpg\",\"provider_metadata\":{\"public_id\":\"small_7_67221e4a5a\",\"resource_type\":\"image\"}}}',
    '7_67221e4a5a',
    '.jpg',
    'image/jpeg',
    151.60,
    'https://res.cloudinary.com/dpv0ukspz/image/upload/v1629888178/7_67221e4a5a.jpg',
    NULL,
    'cloudinary',
    '{\"public_id\":\"7_67221e4a5a\",\"resource_type\":\"image\"}',
    1,
    1,
    '2021-08-25 10:43:01',
    '2021-08-25 10:43:01'
  );
INSERT INTO
  `upload_file` (
    `id`,
    `name`,
    `alternativeText`,
    `caption`,
    `width`,
    `height`,
    `formats`,
    `hash`,
    `ext`,
    `mime`,
    `size`,
    `url`,
    `previewUrl`,
    `provider`,
    `provider_metadata`,
    `created_by`,
    `updated_by`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    46,
    '3.jpg',
    '',
    '',
    634,
    951,
    '{\"thumbnail\":{\"name\":\"thumbnail_3.jpg\",\"hash\":\"thumbnail_3_16ba410e18\",\"ext\":\".jpg\",\"mime\":\"image/jpeg\",\"width\":104,\"height\":156,\"size\":4.37,\"path\":null,\"url\":\"https://res.cloudinary.com/dpv0ukspz/image/upload/v1629888179/thumbnail_3_16ba410e18.jpg\",\"provider_metadata\":{\"public_id\":\"thumbnail_3_16ba410e18\",\"resource_type\":\"image\"}},\"medium\":{\"name\":\"medium_3.jpg\",\"hash\":\"medium_3_16ba410e18\",\"ext\":\".jpg\",\"mime\":\"image/jpeg\",\"width\":500,\"height\":750,\"size\":48.77,\"path\":null,\"url\":\"https://res.cloudinary.com/dpv0ukspz/image/upload/v1629888180/medium_3_16ba410e18.jpg\",\"provider_metadata\":{\"public_id\":\"medium_3_16ba410e18\",\"resource_type\":\"image\"}},\"small\":{\"name\":\"small_3.jpg\",\"hash\":\"small_3_16ba410e18\",\"ext\":\".jpg\",\"mime\":\"image/jpeg\",\"width\":333,\"height\":500,\"size\":26.3,\"path\":null,\"url\":\"https://res.cloudinary.com/dpv0ukspz/image/upload/v1629888181/small_3_16ba410e18.jpg\",\"provider_metadata\":{\"public_id\":\"small_3_16ba410e18\",\"resource_type\":\"image\"}}}',
    '3_16ba410e18',
    '.jpg',
    'image/jpeg',
    68.61,
    'https://res.cloudinary.com/dpv0ukspz/image/upload/v1629888178/3_16ba410e18.jpg',
    NULL,
    'cloudinary',
    '{\"public_id\":\"3_16ba410e18\",\"resource_type\":\"image\"}',
    1,
    1,
    '2021-08-25 10:43:02',
    '2021-08-25 10:43:02'
  );
INSERT INTO
  `upload_file` (
    `id`,
    `name`,
    `alternativeText`,
    `caption`,
    `width`,
    `height`,
    `formats`,
    `hash`,
    `ext`,
    `mime`,
    `size`,
    `url`,
    `previewUrl`,
    `provider`,
    `provider_metadata`,
    `created_by`,
    `updated_by`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    47,
    '9.jpg',
    '',
    '',
    634,
    951,
    '{\"thumbnail\":{\"name\":\"thumbnail_9.jpg\",\"hash\":\"thumbnail_9_d7265ea56e\",\"ext\":\".jpg\",\"mime\":\"image/jpeg\",\"width\":104,\"height\":156,\"size\":5.6,\"path\":null,\"url\":\"https://res.cloudinary.com/dpv0ukspz/image/upload/v1629888182/thumbnail_9_d7265ea56e.jpg\",\"provider_metadata\":{\"public_id\":\"thumbnail_9_d7265ea56e\",\"resource_type\":\"image\"}},\"medium\":{\"name\":\"medium_9.jpg\",\"hash\":\"medium_9_d7265ea56e\",\"ext\":\".jpg\",\"mime\":\"image/jpeg\",\"width\":500,\"height\":750,\"size\":95.36,\"path\":null,\"url\":\"https://res.cloudinary.com/dpv0ukspz/image/upload/v1629888183/medium_9_d7265ea56e.jpg\",\"provider_metadata\":{\"public_id\":\"medium_9_d7265ea56e\",\"resource_type\":\"image\"}},\"small\":{\"name\":\"small_9.jpg\",\"hash\":\"small_9_d7265ea56e\",\"ext\":\".jpg\",\"mime\":\"image/jpeg\",\"width\":333,\"height\":500,\"size\":45.41,\"path\":null,\"url\":\"https://res.cloudinary.com/dpv0ukspz/image/upload/v1629888183/small_9_d7265ea56e.jpg\",\"provider_metadata\":{\"public_id\":\"small_9_d7265ea56e\",\"resource_type\":\"image\"}}}',
    '9_d7265ea56e',
    '.jpg',
    'image/jpeg',
    143.79,
    'https://res.cloudinary.com/dpv0ukspz/image/upload/v1629888181/9_d7265ea56e.jpg',
    NULL,
    'cloudinary',
    '{\"public_id\":\"9_d7265ea56e\",\"resource_type\":\"image\"}',
    1,
    1,
    '2021-08-25 10:43:05',
    '2021-08-25 10:43:05'
  );
INSERT INTO
  `upload_file` (
    `id`,
    `name`,
    `alternativeText`,
    `caption`,
    `width`,
    `height`,
    `formats`,
    `hash`,
    `ext`,
    `mime`,
    `size`,
    `url`,
    `previewUrl`,
    `provider`,
    `provider_metadata`,
    `created_by`,
    `updated_by`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    48,
    '10.jpg',
    '',
    '',
    675,
    900,
    '{\"thumbnail\":{\"name\":\"thumbnail_10.jpg\",\"hash\":\"thumbnail_10_84d740ff9d\",\"ext\":\".jpg\",\"mime\":\"image/jpeg\",\"width\":117,\"height\":156,\"size\":6.03,\"path\":null,\"url\":\"https://res.cloudinary.com/dpv0ukspz/image/upload/v1629888182/thumbnail_10_84d740ff9d.jpg\",\"provider_metadata\":{\"public_id\":\"thumbnail_10_84d740ff9d\",\"resource_type\":\"image\"}},\"medium\":{\"name\":\"medium_10.jpg\",\"hash\":\"medium_10_84d740ff9d\",\"ext\":\".jpg\",\"mime\":\"image/jpeg\",\"width\":563,\"height\":750,\"size\":91.28,\"path\":null,\"url\":\"https://res.cloudinary.com/dpv0ukspz/image/upload/v1629888183/medium_10_84d740ff9d.jpg\",\"provider_metadata\":{\"public_id\":\"medium_10_84d740ff9d\",\"resource_type\":\"image\"}},\"small\":{\"name\":\"small_10.jpg\",\"hash\":\"small_10_84d740ff9d\",\"ext\":\".jpg\",\"mime\":\"image/jpeg\",\"width\":375,\"height\":500,\"size\":45.67,\"path\":null,\"url\":\"https://res.cloudinary.com/dpv0ukspz/image/upload/v1629888183/small_10_84d740ff9d.jpg\",\"provider_metadata\":{\"public_id\":\"small_10_84d740ff9d\",\"resource_type\":\"image\"}}}',
    '10_84d740ff9d',
    '.jpg',
    'image/jpeg',
    126.29,
    'https://res.cloudinary.com/dpv0ukspz/image/upload/v1629888181/10_84d740ff9d.jpg',
    NULL,
    'cloudinary',
    '{\"public_id\":\"10_84d740ff9d\",\"resource_type\":\"image\"}',
    1,
    1,
    '2021-08-25 10:43:05',
    '2021-08-25 10:43:05'
  );
INSERT INTO
  `upload_file` (
    `id`,
    `name`,
    `alternativeText`,
    `caption`,
    `width`,
    `height`,
    `formats`,
    `hash`,
    `ext`,
    `mime`,
    `size`,
    `url`,
    `previewUrl`,
    `provider`,
    `provider_metadata`,
    `created_by`,
    `updated_by`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    49,
    '13.jpg',
    '',
    '',
    634,
    951,
    '{\"thumbnail\":{\"name\":\"thumbnail_13.jpg\",\"hash\":\"thumbnail_13_120506c0ab\",\"ext\":\".jpg\",\"mime\":\"image/jpeg\",\"width\":104,\"height\":156,\"size\":3.3,\"path\":null,\"url\":\"https://res.cloudinary.com/dpv0ukspz/image/upload/v1629888182/thumbnail_13_120506c0ab.jpg\",\"provider_metadata\":{\"public_id\":\"thumbnail_13_120506c0ab\",\"resource_type\":\"image\"}},\"medium\":{\"name\":\"medium_13.jpg\",\"hash\":\"medium_13_120506c0ab\",\"ext\":\".jpg\",\"mime\":\"image/jpeg\",\"width\":500,\"height\":750,\"size\":38.24,\"path\":null,\"url\":\"https://res.cloudinary.com/dpv0ukspz/image/upload/v1629888183/medium_13_120506c0ab.jpg\",\"provider_metadata\":{\"public_id\":\"medium_13_120506c0ab\",\"resource_type\":\"image\"}},\"small\":{\"name\":\"small_13.jpg\",\"hash\":\"small_13_120506c0ab\",\"ext\":\".jpg\",\"mime\":\"image/jpeg\",\"width\":333,\"height\":500,\"size\":19.87,\"path\":null,\"url\":\"https://res.cloudinary.com/dpv0ukspz/image/upload/v1629888184/small_13_120506c0ab.jpg\",\"provider_metadata\":{\"public_id\":\"small_13_120506c0ab\",\"resource_type\":\"image\"}}}',
    '13_120506c0ab',
    '.jpg',
    'image/jpeg',
    56.48,
    'https://res.cloudinary.com/dpv0ukspz/image/upload/v1629888181/13_120506c0ab.jpg',
    NULL,
    'cloudinary',
    '{\"public_id\":\"13_120506c0ab\",\"resource_type\":\"image\"}',
    1,
    1,
    '2021-08-25 10:43:05',
    '2021-08-25 10:43:05'
  );
INSERT INTO
  `upload_file` (
    `id`,
    `name`,
    `alternativeText`,
    `caption`,
    `width`,
    `height`,
    `formats`,
    `hash`,
    `ext`,
    `mime`,
    `size`,
    `url`,
    `previewUrl`,
    `provider`,
    `provider_metadata`,
    `created_by`,
    `updated_by`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    50,
    '12.jpg',
    '',
    '',
    640,
    943,
    '{\"thumbnail\":{\"name\":\"thumbnail_12.jpg\",\"hash\":\"thumbnail_12_9389c92f0b\",\"ext\":\".jpg\",\"mime\":\"image/jpeg\",\"width\":106,\"height\":156,\"size\":5.21,\"path\":null,\"url\":\"https://res.cloudinary.com/dpv0ukspz/image/upload/v1629888182/thumbnail_12_9389c92f0b.jpg\",\"provider_metadata\":{\"public_id\":\"thumbnail_12_9389c92f0b\",\"resource_type\":\"image\"}},\"medium\":{\"name\":\"medium_12.jpg\",\"hash\":\"medium_12_9389c92f0b\",\"ext\":\".jpg\",\"mime\":\"image/jpeg\",\"width\":509,\"height\":750,\"size\":54.99,\"path\":null,\"url\":\"https://res.cloudinary.com/dpv0ukspz/image/upload/v1629888183/medium_12_9389c92f0b.jpg\",\"provider_metadata\":{\"public_id\":\"medium_12_9389c92f0b\",\"resource_type\":\"image\"}},\"small\":{\"name\":\"small_12.jpg\",\"hash\":\"small_12_9389c92f0b\",\"ext\":\".jpg\",\"mime\":\"image/jpeg\",\"width\":339,\"height\":500,\"size\":29.96,\"path\":null,\"url\":\"https://res.cloudinary.com/dpv0ukspz/image/upload/v1629888184/small_12_9389c92f0b.jpg\",\"provider_metadata\":{\"public_id\":\"small_12_9389c92f0b\",\"resource_type\":\"image\"}}}',
    '12_9389c92f0b',
    '.jpg',
    'image/jpeg',
    76.80,
    'https://res.cloudinary.com/dpv0ukspz/image/upload/v1629888181/12_9389c92f0b.jpg',
    NULL,
    'cloudinary',
    '{\"public_id\":\"12_9389c92f0b\",\"resource_type\":\"image\"}',
    1,
    1,
    '2021-08-25 10:43:05',
    '2021-08-25 10:43:05'
  );
INSERT INTO
  `upload_file` (
    `id`,
    `name`,
    `alternativeText`,
    `caption`,
    `width`,
    `height`,
    `formats`,
    `hash`,
    `ext`,
    `mime`,
    `size`,
    `url`,
    `previewUrl`,
    `provider`,
    `provider_metadata`,
    `created_by`,
    `updated_by`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    51,
    '11.jpg',
    '',
    '',
    700,
    875,
    '{\"thumbnail\":{\"name\":\"thumbnail_11.jpg\",\"hash\":\"thumbnail_11_c569864d10\",\"ext\":\".jpg\",\"mime\":\"image/jpeg\",\"width\":125,\"height\":156,\"size\":8.28,\"path\":null,\"url\":\"https://res.cloudinary.com/dpv0ukspz/image/upload/v1629888182/thumbnail_11_c569864d10.jpg\",\"provider_metadata\":{\"public_id\":\"thumbnail_11_c569864d10\",\"resource_type\":\"image\"}},\"medium\":{\"name\":\"medium_11.jpg\",\"hash\":\"medium_11_c569864d10\",\"ext\":\".jpg\",\"mime\":\"image/jpeg\",\"width\":600,\"height\":750,\"size\":100.47,\"path\":null,\"url\":\"https://res.cloudinary.com/dpv0ukspz/image/upload/v1629888183/medium_11_c569864d10.jpg\",\"provider_metadata\":{\"public_id\":\"medium_11_c569864d10\",\"resource_type\":\"image\"}},\"small\":{\"name\":\"small_11.jpg\",\"hash\":\"small_11_c569864d10\",\"ext\":\".jpg\",\"mime\":\"image/jpeg\",\"width\":400,\"height\":500,\"size\":54.99,\"path\":null,\"url\":\"https://res.cloudinary.com/dpv0ukspz/image/upload/v1629888184/small_11_c569864d10.jpg\",\"provider_metadata\":{\"public_id\":\"small_11_c569864d10\",\"resource_type\":\"image\"}}}',
    '11_c569864d10',
    '.jpg',
    'image/jpeg',
    126.71,
    'https://res.cloudinary.com/dpv0ukspz/image/upload/v1629888181/11_c569864d10.jpg',
    NULL,
    'cloudinary',
    '{\"public_id\":\"11_c569864d10\",\"resource_type\":\"image\"}',
    1,
    1,
    '2021-08-25 10:43:05',
    '2021-08-25 10:43:05'
  );
INSERT INTO
  `upload_file` (
    `id`,
    `name`,
    `alternativeText`,
    `caption`,
    `width`,
    `height`,
    `formats`,
    `hash`,
    `ext`,
    `mime`,
    `size`,
    `url`,
    `previewUrl`,
    `provider`,
    `provider_metadata`,
    `created_by`,
    `updated_by`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    52,
    '14.jpg',
    '',
    '',
    675,
    900,
    '{\"thumbnail\":{\"name\":\"thumbnail_14.jpg\",\"hash\":\"thumbnail_14_f51f5d39b6\",\"ext\":\".jpg\",\"mime\":\"image/jpeg\",\"width\":117,\"height\":156,\"size\":7.3,\"path\":null,\"url\":\"https://res.cloudinary.com/dpv0ukspz/image/upload/v1629888183/thumbnail_14_f51f5d39b6.jpg\",\"provider_metadata\":{\"public_id\":\"thumbnail_14_f51f5d39b6\",\"resource_type\":\"image\"}},\"medium\":{\"name\":\"medium_14.jpg\",\"hash\":\"medium_14_f51f5d39b6\",\"ext\":\".jpg\",\"mime\":\"image/jpeg\",\"width\":563,\"height\":750,\"size\":114.29,\"path\":null,\"url\":\"https://res.cloudinary.com/dpv0ukspz/image/upload/v1629888184/medium_14_f51f5d39b6.jpg\",\"provider_metadata\":{\"public_id\":\"medium_14_f51f5d39b6\",\"resource_type\":\"image\"}},\"small\":{\"name\":\"small_14.jpg\",\"hash\":\"small_14_f51f5d39b6\",\"ext\":\".jpg\",\"mime\":\"image/jpeg\",\"width\":375,\"height\":500,\"size\":56.25,\"path\":null,\"url\":\"https://res.cloudinary.com/dpv0ukspz/image/upload/v1629888185/small_14_f51f5d39b6.jpg\",\"provider_metadata\":{\"public_id\":\"small_14_f51f5d39b6\",\"resource_type\":\"image\"}}}',
    '14_f51f5d39b6',
    '.jpg',
    'image/jpeg',
    154.87,
    'https://res.cloudinary.com/dpv0ukspz/image/upload/v1629888182/14_f51f5d39b6.jpg',
    NULL,
    'cloudinary',
    '{\"public_id\":\"14_f51f5d39b6\",\"resource_type\":\"image\"}',
    1,
    1,
    '2021-08-25 10:43:06',
    '2021-08-25 10:43:06'
  );
INSERT INTO
  `upload_file` (
    `id`,
    `name`,
    `alternativeText`,
    `caption`,
    `width`,
    `height`,
    `formats`,
    `hash`,
    `ext`,
    `mime`,
    `size`,
    `url`,
    `previewUrl`,
    `provider`,
    `provider_metadata`,
    `created_by`,
    `updated_by`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    53,
    '16.jpg',
    '',
    '',
    634,
    951,
    '{\"thumbnail\":{\"name\":\"thumbnail_16.jpg\",\"hash\":\"thumbnail_16_ccdb5db147\",\"ext\":\".jpg\",\"mime\":\"image/jpeg\",\"width\":104,\"height\":156,\"size\":4.83,\"path\":null,\"url\":\"https://res.cloudinary.com/dpv0ukspz/image/upload/v1629888185/thumbnail_16_ccdb5db147.jpg\",\"provider_metadata\":{\"public_id\":\"thumbnail_16_ccdb5db147\",\"resource_type\":\"image\"}},\"medium\":{\"name\":\"medium_16.jpg\",\"hash\":\"medium_16_ccdb5db147\",\"ext\":\".jpg\",\"mime\":\"image/jpeg\",\"width\":500,\"height\":750,\"size\":71.68,\"path\":null,\"url\":\"https://res.cloudinary.com/dpv0ukspz/image/upload/v1629888186/medium_16_ccdb5db147.jpg\",\"provider_metadata\":{\"public_id\":\"medium_16_ccdb5db147\",\"resource_type\":\"image\"}},\"small\":{\"name\":\"small_16.jpg\",\"hash\":\"small_16_ccdb5db147\",\"ext\":\".jpg\",\"mime\":\"image/jpeg\",\"width\":333,\"height\":500,\"size\":35.71,\"path\":null,\"url\":\"https://res.cloudinary.com/dpv0ukspz/image/upload/v1629888187/small_16_ccdb5db147.jpg\",\"provider_metadata\":{\"public_id\":\"small_16_ccdb5db147\",\"resource_type\":\"image\"}}}',
    '16_ccdb5db147',
    '.jpg',
    'image/jpeg',
    107.54,
    'https://res.cloudinary.com/dpv0ukspz/image/upload/v1629888185/16_ccdb5db147.jpg',
    NULL,
    'cloudinary',
    '{\"public_id\":\"16_ccdb5db147\",\"resource_type\":\"image\"}',
    1,
    1,
    '2021-08-25 10:43:08',
    '2021-08-25 10:43:08'
  );
INSERT INTO
  `upload_file` (
    `id`,
    `name`,
    `alternativeText`,
    `caption`,
    `width`,
    `height`,
    `formats`,
    `hash`,
    `ext`,
    `mime`,
    `size`,
    `url`,
    `previewUrl`,
    `provider`,
    `provider_metadata`,
    `created_by`,
    `updated_by`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    54,
    '15.jpg',
    '',
    '',
    634,
    951,
    '{\"thumbnail\":{\"name\":\"thumbnail_15.jpg\",\"hash\":\"thumbnail_15_c9e26ac99b\",\"ext\":\".jpg\",\"mime\":\"image/jpeg\",\"width\":104,\"height\":156,\"size\":6.35,\"path\":null,\"url\":\"https://res.cloudinary.com/dpv0ukspz/image/upload/v1629888185/thumbnail_15_c9e26ac99b.jpg\",\"provider_metadata\":{\"public_id\":\"thumbnail_15_c9e26ac99b\",\"resource_type\":\"image\"}},\"medium\":{\"name\":\"medium_15.jpg\",\"hash\":\"medium_15_c9e26ac99b\",\"ext\":\".jpg\",\"mime\":\"image/jpeg\",\"width\":500,\"height\":750,\"size\":97.63,\"path\":null,\"url\":\"https://res.cloudinary.com/dpv0ukspz/image/upload/v1629888186/medium_15_c9e26ac99b.jpg\",\"provider_metadata\":{\"public_id\":\"medium_15_c9e26ac99b\",\"resource_type\":\"image\"}},\"small\":{\"name\":\"small_15.jpg\",\"hash\":\"small_15_c9e26ac99b\",\"ext\":\".jpg\",\"mime\":\"image/jpeg\",\"width\":333,\"height\":500,\"size\":49.61,\"path\":null,\"url\":\"https://res.cloudinary.com/dpv0ukspz/image/upload/v1629888187/small_15_c9e26ac99b.jpg\",\"provider_metadata\":{\"public_id\":\"small_15_c9e26ac99b\",\"resource_type\":\"image\"}}}',
    '15_c9e26ac99b',
    '.jpg',
    'image/jpeg',
    143.32,
    'https://res.cloudinary.com/dpv0ukspz/image/upload/v1629888185/15_c9e26ac99b.jpg',
    NULL,
    'cloudinary',
    '{\"public_id\":\"15_c9e26ac99b\",\"resource_type\":\"image\"}',
    1,
    1,
    '2021-08-25 10:43:08',
    '2021-08-25 10:43:08'
  );
INSERT INTO
  `upload_file` (
    `id`,
    `name`,
    `alternativeText`,
    `caption`,
    `width`,
    `height`,
    `formats`,
    `hash`,
    `ext`,
    `mime`,
    `size`,
    `url`,
    `previewUrl`,
    `provider`,
    `provider_metadata`,
    `created_by`,
    `updated_by`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    55,
    '17.jpg',
    '',
    '',
    1050,
    700,
    '{\"thumbnail\":{\"name\":\"thumbnail_17.jpg\",\"hash\":\"thumbnail_17_b50da0f1d5\",\"ext\":\".jpg\",\"mime\":\"image/jpeg\",\"width\":234,\"height\":156,\"size\":8.26,\"path\":null,\"url\":\"https://res.cloudinary.com/dpv0ukspz/image/upload/v1629888185/thumbnail_17_b50da0f1d5.jpg\",\"provider_metadata\":{\"public_id\":\"thumbnail_17_b50da0f1d5\",\"resource_type\":\"image\"}},\"large\":{\"name\":\"large_17.jpg\",\"hash\":\"large_17_b50da0f1d5\",\"ext\":\".jpg\",\"mime\":\"image/jpeg\",\"width\":1000,\"height\":667,\"size\":71.77,\"path\":null,\"url\":\"https://res.cloudinary.com/dpv0ukspz/image/upload/v1629888186/large_17_b50da0f1d5.jpg\",\"provider_metadata\":{\"public_id\":\"large_17_b50da0f1d5\",\"resource_type\":\"image\"}},\"medium\":{\"name\":\"medium_17.jpg\",\"hash\":\"medium_17_b50da0f1d5\",\"ext\":\".jpg\",\"mime\":\"image/jpeg\",\"width\":750,\"height\":500,\"size\":48.01,\"path\":null,\"url\":\"https://res.cloudinary.com/dpv0ukspz/image/upload/v1629888187/medium_17_b50da0f1d5.jpg\",\"provider_metadata\":{\"public_id\":\"medium_17_b50da0f1d5\",\"resource_type\":\"image\"}},\"small\":{\"name\":\"small_17.jpg\",\"hash\":\"small_17_b50da0f1d5\",\"ext\":\".jpg\",\"mime\":\"image/jpeg\",\"width\":500,\"height\":333,\"size\":26.39,\"path\":null,\"url\":\"https://res.cloudinary.com/dpv0ukspz/image/upload/v1629888188/small_17_b50da0f1d5.jpg\",\"provider_metadata\":{\"public_id\":\"small_17_b50da0f1d5\",\"resource_type\":\"image\"}}}',
    '17_b50da0f1d5',
    '.jpg',
    'image/jpeg',
    76.83,
    'https://res.cloudinary.com/dpv0ukspz/image/upload/v1629888185/17_b50da0f1d5.jpg',
    NULL,
    'cloudinary',
    '{\"public_id\":\"17_b50da0f1d5\",\"resource_type\":\"image\"}',
    1,
    1,
    '2021-08-25 10:43:09',
    '2021-08-25 10:43:09'
  );
INSERT INTO
  `upload_file` (
    `id`,
    `name`,
    `alternativeText`,
    `caption`,
    `width`,
    `height`,
    `formats`,
    `hash`,
    `ext`,
    `mime`,
    `size`,
    `url`,
    `previewUrl`,
    `provider`,
    `provider_metadata`,
    `created_by`,
    `updated_by`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    56,
    '20.jpg',
    '',
    '',
    633,
    951,
    '{\"thumbnail\":{\"name\":\"thumbnail_20.jpg\",\"hash\":\"thumbnail_20_1356a61417\",\"ext\":\".jpg\",\"mime\":\"image/jpeg\",\"width\":104,\"height\":156,\"size\":3.46,\"path\":null,\"url\":\"https://res.cloudinary.com/dpv0ukspz/image/upload/v1629890326/thumbnail_20_1356a61417.jpg\",\"provider_metadata\":{\"public_id\":\"thumbnail_20_1356a61417\",\"resource_type\":\"image\"}},\"medium\":{\"name\":\"medium_20.jpg\",\"hash\":\"medium_20_1356a61417\",\"ext\":\".jpg\",\"mime\":\"image/jpeg\",\"width\":499,\"height\":750,\"size\":41.19,\"path\":null,\"url\":\"https://res.cloudinary.com/dpv0ukspz/image/upload/v1629890327/medium_20_1356a61417.jpg\",\"provider_metadata\":{\"public_id\":\"medium_20_1356a61417\",\"resource_type\":\"image\"}},\"small\":{\"name\":\"small_20.jpg\",\"hash\":\"small_20_1356a61417\",\"ext\":\".jpg\",\"mime\":\"image/jpeg\",\"width\":333,\"height\":500,\"size\":21.75,\"path\":null,\"url\":\"https://res.cloudinary.com/dpv0ukspz/image/upload/v1629890329/small_20_1356a61417.jpg\",\"provider_metadata\":{\"public_id\":\"small_20_1356a61417\",\"resource_type\":\"image\"}}}',
    '20_1356a61417',
    '.jpg',
    'image/jpeg',
    59.38,
    'https://res.cloudinary.com/dpv0ukspz/image/upload/v1629890325/20_1356a61417.jpg',
    NULL,
    'cloudinary',
    '{\"public_id\":\"20_1356a61417\",\"resource_type\":\"image\"}',
    1,
    1,
    '2021-08-25 11:18:50',
    '2021-08-25 11:18:50'
  );
INSERT INTO
  `upload_file` (
    `id`,
    `name`,
    `alternativeText`,
    `caption`,
    `width`,
    `height`,
    `formats`,
    `hash`,
    `ext`,
    `mime`,
    `size`,
    `url`,
    `previewUrl`,
    `provider`,
    `provider_metadata`,
    `created_by`,
    `updated_by`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    57,
    '19.jpg',
    '',
    '',
    1050,
    700,
    '{\"thumbnail\":{\"name\":\"thumbnail_19.jpg\",\"hash\":\"thumbnail_19_2dd0db12ec\",\"ext\":\".jpg\",\"mime\":\"image/jpeg\",\"width\":234,\"height\":156,\"size\":11.16,\"path\":null,\"url\":\"https://res.cloudinary.com/dpv0ukspz/image/upload/v1629890328/thumbnail_19_2dd0db12ec.jpg\",\"provider_metadata\":{\"public_id\":\"thumbnail_19_2dd0db12ec\",\"resource_type\":\"image\"}},\"large\":{\"name\":\"large_19.jpg\",\"hash\":\"large_19_2dd0db12ec\",\"ext\":\".jpg\",\"mime\":\"image/jpeg\",\"width\":1000,\"height\":667,\"size\":170.65,\"path\":null,\"url\":\"https://res.cloudinary.com/dpv0ukspz/image/upload/v1629890329/large_19_2dd0db12ec.jpg\",\"provider_metadata\":{\"public_id\":\"large_19_2dd0db12ec\",\"resource_type\":\"image\"}},\"medium\":{\"name\":\"medium_19.jpg\",\"hash\":\"medium_19_2dd0db12ec\",\"ext\":\".jpg\",\"mime\":\"image/jpeg\",\"width\":750,\"height\":500,\"size\":104.13,\"path\":null,\"url\":\"https://res.cloudinary.com/dpv0ukspz/image/upload/v1629890331/medium_19_2dd0db12ec.jpg\",\"provider_metadata\":{\"public_id\":\"medium_19_2dd0db12ec\",\"resource_type\":\"image\"}},\"small\":{\"name\":\"small_19.jpg\",\"hash\":\"small_19_2dd0db12ec\",\"ext\":\".jpg\",\"mime\":\"image/jpeg\",\"width\":500,\"height\":333,\"size\":46.75,\"path\":null,\"url\":\"https://res.cloudinary.com/dpv0ukspz/image/upload/v1629890332/small_19_2dd0db12ec.jpg\",\"provider_metadata\":{\"public_id\":\"small_19_2dd0db12ec\",\"resource_type\":\"image\"}}}',
    '19_2dd0db12ec',
    '.jpg',
    'image/jpeg',
    186.28,
    'https://res.cloudinary.com/dpv0ukspz/image/upload/v1629890327/19_2dd0db12ec.jpg',
    NULL,
    'cloudinary',
    '{\"public_id\":\"19_2dd0db12ec\",\"resource_type\":\"image\"}',
    1,
    1,
    '2021-08-25 11:18:53',
    '2021-08-25 11:18:53'
  );
INSERT INTO
  `upload_file` (
    `id`,
    `name`,
    `alternativeText`,
    `caption`,
    `width`,
    `height`,
    `formats`,
    `hash`,
    `ext`,
    `mime`,
    `size`,
    `url`,
    `previewUrl`,
    `provider`,
    `provider_metadata`,
    `created_by`,
    `updated_by`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    58,
    '21.jpg',
    '',
    '',
    634,
    950,
    '{\"thumbnail\":{\"name\":\"thumbnail_21.jpg\",\"hash\":\"thumbnail_21_1cc05e45dc\",\"ext\":\".jpg\",\"mime\":\"image/jpeg\",\"width\":104,\"height\":156,\"size\":4.98,\"path\":null,\"url\":\"https://res.cloudinary.com/dpv0ukspz/image/upload/v1629891586/thumbnail_21_1cc05e45dc.jpg\",\"provider_metadata\":{\"public_id\":\"thumbnail_21_1cc05e45dc\",\"resource_type\":\"image\"}},\"medium\":{\"name\":\"medium_21.jpg\",\"hash\":\"medium_21_1cc05e45dc\",\"ext\":\".jpg\",\"mime\":\"image/jpeg\",\"width\":501,\"height\":750,\"size\":68.58,\"path\":null,\"url\":\"https://res.cloudinary.com/dpv0ukspz/image/upload/v1629891587/medium_21_1cc05e45dc.jpg\",\"provider_metadata\":{\"public_id\":\"medium_21_1cc05e45dc\",\"resource_type\":\"image\"}},\"small\":{\"name\":\"small_21.jpg\",\"hash\":\"small_21_1cc05e45dc\",\"ext\":\".jpg\",\"mime\":\"image/jpeg\",\"width\":334,\"height\":500,\"size\":35.2,\"path\":null,\"url\":\"https://res.cloudinary.com/dpv0ukspz/image/upload/v1629891588/small_21_1cc05e45dc.jpg\",\"provider_metadata\":{\"public_id\":\"small_21_1cc05e45dc\",\"resource_type\":\"image\"}}}',
    '21_1cc05e45dc',
    '.jpg',
    'image/jpeg',
    100.71,
    'https://res.cloudinary.com/dpv0ukspz/image/upload/v1629891585/21_1cc05e45dc.jpg',
    NULL,
    'cloudinary',
    '{\"public_id\":\"21_1cc05e45dc\",\"resource_type\":\"image\"}',
    1,
    1,
    '2021-08-25 11:39:49',
    '2021-08-25 11:39:49'
  );
INSERT INTO
  `upload_file` (
    `id`,
    `name`,
    `alternativeText`,
    `caption`,
    `width`,
    `height`,
    `formats`,
    `hash`,
    `ext`,
    `mime`,
    `size`,
    `url`,
    `previewUrl`,
    `provider`,
    `provider_metadata`,
    `created_by`,
    `updated_by`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    60,
    'ppppp.JPG',
    '',
    '',
    1804,
    950,
    '{\"thumbnail\":{\"name\":\"thumbnail_ppppp.JPG\",\"hash\":\"thumbnail_ppppp_f4a65c1f29\",\"ext\":\".JPG\",\"mime\":\"image/jpeg\",\"width\":245,\"height\":129,\"size\":6.67,\"path\":null,\"url\":\"https://res.cloudinary.com/dpv0ukspz/image/upload/v1629973453/thumbnail_ppppp_f4a65c1f29.jpg\",\"provider_metadata\":{\"public_id\":\"thumbnail_ppppp_f4a65c1f29\",\"resource_type\":\"image\"}},\"large\":{\"name\":\"large_ppppp.JPG\",\"hash\":\"large_ppppp_f4a65c1f29\",\"ext\":\".JPG\",\"mime\":\"image/jpeg\",\"width\":1000,\"height\":527,\"size\":58.1,\"path\":null,\"url\":\"https://res.cloudinary.com/dpv0ukspz/image/upload/v1629973454/large_ppppp_f4a65c1f29.jpg\",\"provider_metadata\":{\"public_id\":\"large_ppppp_f4a65c1f29\",\"resource_type\":\"image\"}},\"medium\":{\"name\":\"medium_ppppp.JPG\",\"hash\":\"medium_ppppp_f4a65c1f29\",\"ext\":\".JPG\",\"mime\":\"image/jpeg\",\"width\":750,\"height\":395,\"size\":36.87,\"path\":null,\"url\":\"https://res.cloudinary.com/dpv0ukspz/image/upload/v1629973455/medium_ppppp_f4a65c1f29.jpg\",\"provider_metadata\":{\"public_id\":\"medium_ppppp_f4a65c1f29\",\"resource_type\":\"image\"}},\"small\":{\"name\":\"small_ppppp.JPG\",\"hash\":\"small_ppppp_f4a65c1f29\",\"ext\":\".JPG\",\"mime\":\"image/jpeg\",\"width\":500,\"height\":263,\"size\":20.05,\"path\":null,\"url\":\"https://res.cloudinary.com/dpv0ukspz/image/upload/v1629973455/small_ppppp_f4a65c1f29.jpg\",\"provider_metadata\":{\"public_id\":\"small_ppppp_f4a65c1f29\",\"resource_type\":\"image\"}}}',
    'ppppp_f4a65c1f29',
    '.JPG',
    'image/jpeg',
    139.00,
    'https://res.cloudinary.com/dpv0ukspz/image/upload/v1629973452/ppppp_f4a65c1f29.jpg',
    NULL,
    'cloudinary',
    '{\"public_id\":\"ppppp_f4a65c1f29\",\"resource_type\":\"image\"}',
    1,
    1,
    '2021-08-26 10:24:16',
    '2021-08-26 10:24:16'
  );
INSERT INTO
  `upload_file` (
    `id`,
    `name`,
    `alternativeText`,
    `caption`,
    `width`,
    `height`,
    `formats`,
    `hash`,
    `ext`,
    `mime`,
    `size`,
    `url`,
    `previewUrl`,
    `provider`,
    `provider_metadata`,
    `created_by`,
    `updated_by`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    61,
    'zzzz.png',
    '',
    '',
    1241,
    611,
    '{\"thumbnail\":{\"name\":\"thumbnail_zzzz.png\",\"hash\":\"thumbnail_zzzz_ef99fa0976\",\"ext\":\".png\",\"mime\":\"image/png\",\"width\":245,\"height\":121,\"size\":16.93,\"path\":null,\"url\":\"https://res.cloudinary.com/dpv0ukspz/image/upload/v1630438650/thumbnail_zzzz_ef99fa0976.png\",\"provider_metadata\":{\"public_id\":\"thumbnail_zzzz_ef99fa0976\",\"resource_type\":\"image\"}},\"large\":{\"name\":\"large_zzzz.png\",\"hash\":\"large_zzzz_ef99fa0976\",\"ext\":\".png\",\"mime\":\"image/png\",\"width\":1000,\"height\":492,\"size\":198.55,\"path\":null,\"url\":\"https://res.cloudinary.com/dpv0ukspz/image/upload/v1630438651/large_zzzz_ef99fa0976.png\",\"provider_metadata\":{\"public_id\":\"large_zzzz_ef99fa0976\",\"resource_type\":\"image\"}},\"medium\":{\"name\":\"medium_zzzz.png\",\"hash\":\"medium_zzzz_ef99fa0976\",\"ext\":\".png\",\"mime\":\"image/png\",\"width\":750,\"height\":369,\"size\":118.34,\"path\":null,\"url\":\"https://res.cloudinary.com/dpv0ukspz/image/upload/v1630438652/medium_zzzz_ef99fa0976.png\",\"provider_metadata\":{\"public_id\":\"medium_zzzz_ef99fa0976\",\"resource_type\":\"image\"}},\"small\":{\"name\":\"small_zzzz.png\",\"hash\":\"small_zzzz_ef99fa0976\",\"ext\":\".png\",\"mime\":\"image/png\",\"width\":500,\"height\":246,\"size\":57.42,\"path\":null,\"url\":\"https://res.cloudinary.com/dpv0ukspz/image/upload/v1630438653/small_zzzz_ef99fa0976.png\",\"provider_metadata\":{\"public_id\":\"small_zzzz_ef99fa0976\",\"resource_type\":\"image\"}}}',
    'zzzz_ef99fa0976',
    '.png',
    'image/png',
    274.38,
    'https://res.cloudinary.com/dpv0ukspz/image/upload/v1630438649/zzzz_ef99fa0976.png',
    NULL,
    'cloudinary',
    '{\"public_id\":\"zzzz_ef99fa0976\",\"resource_type\":\"image\"}',
    1,
    1,
    '2021-08-31 19:37:34',
    '2021-08-31 19:37:34'
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: upload_file_morph
# ------------------------------------------------------------

INSERT INTO
  `upload_file_morph` (
    `id`,
    `upload_file_id`,
    `related_id`,
    `related_type`,
    `field`,
    `order`
  )
VALUES
  (2, 2, 1, 'components_page_heads', 'ogImage', 1);
INSERT INTO
  `upload_file_morph` (
    `id`,
    `upload_file_id`,
    `related_id`,
    `related_type`,
    `field`,
    `order`
  )
VALUES
  (
    3,
    3,
    1,
    'components_creative_component_creative_items',
    'image',
    1
  );
INSERT INTO
  `upload_file_morph` (
    `id`,
    `upload_file_id`,
    `related_id`,
    `related_type`,
    `field`,
    `order`
  )
VALUES
  (
    4,
    4,
    2,
    'components_creative_component_creative_items',
    'image',
    1
  );
INSERT INTO
  `upload_file_morph` (
    `id`,
    `upload_file_id`,
    `related_id`,
    `related_type`,
    `field`,
    `order`
  )
VALUES
  (
    5,
    5,
    3,
    'components_creative_component_creative_items',
    'image',
    1
  );
INSERT INTO
  `upload_file_morph` (
    `id`,
    `upload_file_id`,
    `related_id`,
    `related_type`,
    `field`,
    `order`
  )
VALUES
  (
    130,
    3,
    4,
    'components_creative_component_creative_items',
    'image',
    1
  );
INSERT INTO
  `upload_file_morph` (
    `id`,
    `upload_file_id`,
    `related_id`,
    `related_type`,
    `field`,
    `order`
  )
VALUES
  (
    131,
    4,
    5,
    'components_creative_component_creative_items',
    'image',
    1
  );
INSERT INTO
  `upload_file_morph` (
    `id`,
    `upload_file_id`,
    `related_id`,
    `related_type`,
    `field`,
    `order`
  )
VALUES
  (
    132,
    5,
    6,
    'components_creative_component_creative_items',
    'image',
    1
  );
INSERT INTO
  `upload_file_morph` (
    `id`,
    `upload_file_id`,
    `related_id`,
    `related_type`,
    `field`,
    `order`
  )
VALUES
  (133, 6, 1, 'flow_pages', 'slideImages', 1);
INSERT INTO
  `upload_file_morph` (
    `id`,
    `upload_file_id`,
    `related_id`,
    `related_type`,
    `field`,
    `order`
  )
VALUES
  (134, 7, 1, 'flow_pages', 'slideImages', 2);
INSERT INTO
  `upload_file_morph` (
    `id`,
    `upload_file_id`,
    `related_id`,
    `related_type`,
    `field`,
    `order`
  )
VALUES
  (135, 8, 1, 'flow_pages', 'slideImages', 3);
INSERT INTO
  `upload_file_morph` (
    `id`,
    `upload_file_id`,
    `related_id`,
    `related_type`,
    `field`,
    `order`
  )
VALUES
  (136, 9, 1, 'flow_pages', 'slideImages', 4);
INSERT INTO
  `upload_file_morph` (
    `id`,
    `upload_file_id`,
    `related_id`,
    `related_type`,
    `field`,
    `order`
  )
VALUES
  (137, 10, 1, 'flow_pages', 'slideImages', 5);
INSERT INTO
  `upload_file_morph` (
    `id`,
    `upload_file_id`,
    `related_id`,
    `related_type`,
    `field`,
    `order`
  )
VALUES
  (138, 11, 1, 'flow_pages', 'slideImages', 6);
INSERT INTO
  `upload_file_morph` (
    `id`,
    `upload_file_id`,
    `related_id`,
    `related_type`,
    `field`,
    `order`
  )
VALUES
  (139, 12, 1, 'flow_pages', 'slideImages', 7);
INSERT INTO
  `upload_file_morph` (
    `id`,
    `upload_file_id`,
    `related_id`,
    `related_type`,
    `field`,
    `order`
  )
VALUES
  (
    144,
    1,
    1,
    'components_page_localized_heads',
    'ogImage',
    1
  );
INSERT INTO
  `upload_file_morph` (
    `id`,
    `upload_file_id`,
    `related_id`,
    `related_type`,
    `field`,
    `order`
  )
VALUES
  (
    145,
    14,
    2,
    'components_page_localized_heads',
    'ogImage',
    1
  );
INSERT INTO
  `upload_file_morph` (
    `id`,
    `upload_file_id`,
    `related_id`,
    `related_type`,
    `field`,
    `order`
  )
VALUES
  (
    146,
    13,
    3,
    'components_page_localized_heads',
    'ogImage',
    1
  );
INSERT INTO
  `upload_file_morph` (
    `id`,
    `upload_file_id`,
    `related_id`,
    `related_type`,
    `field`,
    `order`
  )
VALUES
  (
    188,
    17,
    4,
    'components_page_localized_heads',
    'ogImage',
    1
  );
INSERT INTO
  `upload_file_morph` (
    `id`,
    `upload_file_id`,
    `related_id`,
    `related_type`,
    `field`,
    `order`
  )
VALUES
  (
    189,
    18,
    8,
    'components_creative_component_creative_items',
    'image',
    1
  );
INSERT INTO
  `upload_file_morph` (
    `id`,
    `upload_file_id`,
    `related_id`,
    `related_type`,
    `field`,
    `order`
  )
VALUES
  (
    190,
    15,
    7,
    'components_creative_component_creative_items',
    'image',
    1
  );
INSERT INTO
  `upload_file_morph` (
    `id`,
    `upload_file_id`,
    `related_id`,
    `related_type`,
    `field`,
    `order`
  )
VALUES
  (
    191,
    16,
    9,
    'components_creative_component_creative_items',
    'image',
    1
  );
INSERT INTO
  `upload_file_morph` (
    `id`,
    `upload_file_id`,
    `related_id`,
    `related_type`,
    `field`,
    `order`
  )
VALUES
  (
    192,
    19,
    5,
    'components_page_localized_heads',
    'ogImage',
    1
  );
INSERT INTO
  `upload_file_morph` (
    `id`,
    `upload_file_id`,
    `related_id`,
    `related_type`,
    `field`,
    `order`
  )
VALUES
  (
    193,
    20,
    6,
    'components_page_localized_heads',
    'ogImage',
    1
  );
INSERT INTO
  `upload_file_morph` (
    `id`,
    `upload_file_id`,
    `related_id`,
    `related_type`,
    `field`,
    `order`
  )
VALUES
  (
    231,
    37,
    7,
    'components_page_localized_heads',
    'ogImage',
    1
  );
INSERT INTO
  `upload_file_morph` (
    `id`,
    `upload_file_id`,
    `related_id`,
    `related_type`,
    `field`,
    `order`
  )
VALUES
  (
    232,
    36,
    11,
    'components_creative_component_creative_items',
    'image',
    1
  );
INSERT INTO
  `upload_file_morph` (
    `id`,
    `upload_file_id`,
    `related_id`,
    `related_type`,
    `field`,
    `order`
  )
VALUES
  (
    233,
    22,
    12,
    'components_creative_component_creative_items',
    'image',
    1
  );
INSERT INTO
  `upload_file_morph` (
    `id`,
    `upload_file_id`,
    `related_id`,
    `related_type`,
    `field`,
    `order`
  )
VALUES
  (
    234,
    35,
    14,
    'components_creative_component_creative_items',
    'image',
    1
  );
INSERT INTO
  `upload_file_morph` (
    `id`,
    `upload_file_id`,
    `related_id`,
    `related_type`,
    `field`,
    `order`
  )
VALUES
  (
    235,
    23,
    13,
    'components_creative_component_creative_items',
    'image',
    1
  );
INSERT INTO
  `upload_file_morph` (
    `id`,
    `upload_file_id`,
    `related_id`,
    `related_type`,
    `field`,
    `order`
  )
VALUES
  (
    236,
    25,
    15,
    'components_creative_component_creative_items',
    'image',
    1
  );
INSERT INTO
  `upload_file_morph` (
    `id`,
    `upload_file_id`,
    `related_id`,
    `related_type`,
    `field`,
    `order`
  )
VALUES
  (
    237,
    26,
    16,
    'components_creative_component_creative_items',
    'image',
    1
  );
INSERT INTO
  `upload_file_morph` (
    `id`,
    `upload_file_id`,
    `related_id`,
    `related_type`,
    `field`,
    `order`
  )
VALUES
  (
    238,
    27,
    17,
    'components_creative_component_creative_items',
    'image',
    1
  );
INSERT INTO
  `upload_file_morph` (
    `id`,
    `upload_file_id`,
    `related_id`,
    `related_type`,
    `field`,
    `order`
  )
VALUES
  (
    239,
    29,
    19,
    'components_creative_component_creative_items',
    'image',
    1
  );
INSERT INTO
  `upload_file_morph` (
    `id`,
    `upload_file_id`,
    `related_id`,
    `related_type`,
    `field`,
    `order`
  )
VALUES
  (
    240,
    28,
    18,
    'components_creative_component_creative_items',
    'image',
    1
  );
INSERT INTO
  `upload_file_morph` (
    `id`,
    `upload_file_id`,
    `related_id`,
    `related_type`,
    `field`,
    `order`
  )
VALUES
  (
    241,
    32,
    21,
    'components_creative_component_creative_items',
    'image',
    1
  );
INSERT INTO
  `upload_file_morph` (
    `id`,
    `upload_file_id`,
    `related_id`,
    `related_type`,
    `field`,
    `order`
  )
VALUES
  (
    242,
    34,
    20,
    'components_creative_component_creative_items',
    'image',
    1
  );
INSERT INTO
  `upload_file_morph` (
    `id`,
    `upload_file_id`,
    `related_id`,
    `related_type`,
    `field`,
    `order`
  )
VALUES
  (
    371,
    60,
    8,
    'components_page_localized_heads',
    'ogImage',
    1
  );
INSERT INTO
  `upload_file_morph` (
    `id`,
    `upload_file_id`,
    `related_id`,
    `related_type`,
    `field`,
    `order`
  )
VALUES
  (
    372,
    38,
    22,
    'components_creative_component_creative_items',
    'image',
    1
  );
INSERT INTO
  `upload_file_morph` (
    `id`,
    `upload_file_id`,
    `related_id`,
    `related_type`,
    `field`,
    `order`
  )
VALUES
  (
    373,
    39,
    23,
    'components_creative_component_creative_items',
    'image',
    1
  );
INSERT INTO
  `upload_file_morph` (
    `id`,
    `upload_file_id`,
    `related_id`,
    `related_type`,
    `field`,
    `order`
  )
VALUES
  (
    374,
    53,
    24,
    'components_creative_component_creative_items',
    'image',
    1
  );
INSERT INTO
  `upload_file_morph` (
    `id`,
    `upload_file_id`,
    `related_id`,
    `related_type`,
    `field`,
    `order`
  )
VALUES
  (
    375,
    54,
    25,
    'components_creative_component_creative_items',
    'image',
    1
  );
INSERT INTO
  `upload_file_morph` (
    `id`,
    `upload_file_id`,
    `related_id`,
    `related_type`,
    `field`,
    `order`
  )
VALUES
  (
    376,
    55,
    26,
    'components_creative_component_creative_items',
    'image',
    1
  );
INSERT INTO
  `upload_file_morph` (
    `id`,
    `upload_file_id`,
    `related_id`,
    `related_type`,
    `field`,
    `order`
  )
VALUES
  (
    377,
    52,
    27,
    'components_creative_component_creative_items',
    'image',
    1
  );
INSERT INTO
  `upload_file_morph` (
    `id`,
    `upload_file_id`,
    `related_id`,
    `related_type`,
    `field`,
    `order`
  )
VALUES
  (
    378,
    46,
    28,
    'components_creative_component_creative_items',
    'image',
    1
  );
INSERT INTO
  `upload_file_morph` (
    `id`,
    `upload_file_id`,
    `related_id`,
    `related_type`,
    `field`,
    `order`
  )
VALUES
  (
    379,
    48,
    29,
    'components_creative_component_creative_items',
    'image',
    1
  );
INSERT INTO
  `upload_file_morph` (
    `id`,
    `upload_file_id`,
    `related_id`,
    `related_type`,
    `field`,
    `order`
  )
VALUES
  (
    380,
    47,
    30,
    'components_creative_component_creative_items',
    'image',
    1
  );
INSERT INTO
  `upload_file_morph` (
    `id`,
    `upload_file_id`,
    `related_id`,
    `related_type`,
    `field`,
    `order`
  )
VALUES
  (
    381,
    43,
    31,
    'components_creative_component_creative_items',
    'image',
    1
  );
INSERT INTO
  `upload_file_morph` (
    `id`,
    `upload_file_id`,
    `related_id`,
    `related_type`,
    `field`,
    `order`
  )
VALUES
  (
    382,
    44,
    32,
    'components_creative_component_creative_items',
    'image',
    1
  );
INSERT INTO
  `upload_file_morph` (
    `id`,
    `upload_file_id`,
    `related_id`,
    `related_type`,
    `field`,
    `order`
  )
VALUES
  (
    383,
    49,
    33,
    'components_creative_component_creative_items',
    'image',
    1
  );
INSERT INTO
  `upload_file_morph` (
    `id`,
    `upload_file_id`,
    `related_id`,
    `related_type`,
    `field`,
    `order`
  )
VALUES
  (
    384,
    40,
    34,
    'components_creative_component_creative_items',
    'image',
    1
  );
INSERT INTO
  `upload_file_morph` (
    `id`,
    `upload_file_id`,
    `related_id`,
    `related_type`,
    `field`,
    `order`
  )
VALUES
  (
    385,
    41,
    35,
    'components_creative_component_creative_items',
    'image',
    1
  );
INSERT INTO
  `upload_file_morph` (
    `id`,
    `upload_file_id`,
    `related_id`,
    `related_type`,
    `field`,
    `order`
  )
VALUES
  (
    386,
    45,
    36,
    'components_creative_component_creative_items',
    'image',
    1
  );
INSERT INTO
  `upload_file_morph` (
    `id`,
    `upload_file_id`,
    `related_id`,
    `related_type`,
    `field`,
    `order`
  )
VALUES
  (
    387,
    42,
    37,
    'components_creative_component_creative_items',
    'image',
    1
  );
INSERT INTO
  `upload_file_morph` (
    `id`,
    `upload_file_id`,
    `related_id`,
    `related_type`,
    `field`,
    `order`
  )
VALUES
  (
    388,
    51,
    38,
    'components_creative_component_creative_items',
    'image',
    1
  );
INSERT INTO
  `upload_file_morph` (
    `id`,
    `upload_file_id`,
    `related_id`,
    `related_type`,
    `field`,
    `order`
  )
VALUES
  (
    389,
    50,
    39,
    'components_creative_component_creative_items',
    'image',
    1
  );
INSERT INTO
  `upload_file_morph` (
    `id`,
    `upload_file_id`,
    `related_id`,
    `related_type`,
    `field`,
    `order`
  )
VALUES
  (
    390,
    56,
    40,
    'components_creative_component_creative_items',
    'image',
    1
  );
INSERT INTO
  `upload_file_morph` (
    `id`,
    `upload_file_id`,
    `related_id`,
    `related_type`,
    `field`,
    `order`
  )
VALUES
  (
    391,
    57,
    41,
    'components_creative_component_creative_items',
    'image',
    1
  );
INSERT INTO
  `upload_file_morph` (
    `id`,
    `upload_file_id`,
    `related_id`,
    `related_type`,
    `field`,
    `order`
  )
VALUES
  (
    392,
    58,
    42,
    'components_creative_component_creative_items',
    'image',
    1
  );
INSERT INTO
  `upload_file_morph` (
    `id`,
    `upload_file_id`,
    `related_id`,
    `related_type`,
    `field`,
    `order`
  )
VALUES
  (
    418,
    61,
    9,
    'components_page_localized_heads',
    'ogImage',
    1
  );
INSERT INTO
  `upload_file_morph` (
    `id`,
    `upload_file_id`,
    `related_id`,
    `related_type`,
    `field`,
    `order`
  )
VALUES
  (
    419,
    58,
    43,
    'components_creative_component_creative_items',
    'image',
    1
  );
INSERT INTO
  `upload_file_morph` (
    `id`,
    `upload_file_id`,
    `related_id`,
    `related_type`,
    `field`,
    `order`
  )
VALUES
  (
    420,
    53,
    44,
    'components_creative_component_creative_items',
    'image',
    1
  );
INSERT INTO
  `upload_file_morph` (
    `id`,
    `upload_file_id`,
    `related_id`,
    `related_type`,
    `field`,
    `order`
  )
VALUES
  (
    421,
    54,
    45,
    'components_creative_component_creative_items',
    'image',
    1
  );
INSERT INTO
  `upload_file_morph` (
    `id`,
    `upload_file_id`,
    `related_id`,
    `related_type`,
    `field`,
    `order`
  )
VALUES
  (
    422,
    52,
    46,
    'components_creative_component_creative_items',
    'image',
    1
  );
INSERT INTO
  `upload_file_morph` (
    `id`,
    `upload_file_id`,
    `related_id`,
    `related_type`,
    `field`,
    `order`
  )
VALUES
  (
    423,
    47,
    47,
    'components_creative_component_creative_items',
    'image',
    1
  );
INSERT INTO
  `upload_file_morph` (
    `id`,
    `upload_file_id`,
    `related_id`,
    `related_type`,
    `field`,
    `order`
  )
VALUES
  (
    424,
    41,
    48,
    'components_creative_component_creative_items',
    'image',
    1
  );
INSERT INTO
  `upload_file_morph` (
    `id`,
    `upload_file_id`,
    `related_id`,
    `related_type`,
    `field`,
    `order`
  )
VALUES
  (
    425,
    45,
    49,
    'components_creative_component_creative_items',
    'image',
    1
  );
INSERT INTO
  `upload_file_morph` (
    `id`,
    `upload_file_id`,
    `related_id`,
    `related_type`,
    `field`,
    `order`
  )
VALUES
  (
    426,
    32,
    50,
    'components_creative_component_creative_items',
    'image',
    1
  );
INSERT INTO
  `upload_file_morph` (
    `id`,
    `upload_file_id`,
    `related_id`,
    `related_type`,
    `field`,
    `order`
  )
VALUES
  (
    427,
    49,
    51,
    'components_creative_component_creative_items',
    'image',
    1
  );
INSERT INTO
  `upload_file_morph` (
    `id`,
    `upload_file_id`,
    `related_id`,
    `related_type`,
    `field`,
    `order`
  )
VALUES
  (
    428,
    55,
    52,
    'components_creative_component_creative_items',
    'image',
    1
  );
INSERT INTO
  `upload_file_morph` (
    `id`,
    `upload_file_id`,
    `related_id`,
    `related_type`,
    `field`,
    `order`
  )
VALUES
  (
    429,
    43,
    53,
    'components_creative_component_creative_items',
    'image',
    1
  );
INSERT INTO
  `upload_file_morph` (
    `id`,
    `upload_file_id`,
    `related_id`,
    `related_type`,
    `field`,
    `order`
  )
VALUES
  (
    430,
    39,
    54,
    'components_creative_component_creative_items',
    'image',
    1
  );

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
    2,
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
    3,
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
    4,
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
    5,
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
    6,
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
    7,
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
    8,
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
    9,
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
    10,
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
    11,
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
    12,
    'application',
    'language',
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
    13,
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
    14,
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
    15,
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
    16,
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
    17,
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
    18,
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
    19,
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
    20,
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
    21,
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
    22,
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
    23,
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
    24,
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
    25,
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
    26,
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
    27,
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
    28,
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
    29,
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
    30,
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
    31,
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
    32,
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
    33,
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
    34,
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
    35,
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
    36,
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
    37,
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
    38,
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
    39,
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
    40,
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
    41,
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
    42,
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
    43,
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
    44,
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
    45,
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
    46,
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
    47,
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
    48,
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
    49,
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
    50,
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
    51,
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
    52,
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
    53,
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
    54,
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
    55,
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
    56,
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
    57,
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
    58,
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
    59,
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
    60,
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
    61,
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
    62,
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
    63,
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
    64,
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
    65,
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
    66,
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
    67,
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
    68,
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
    69,
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
    70,
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
    71,
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
    72,
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
    73,
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
    74,
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
    75,
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
    76,
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
    77,
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
    78,
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
    79,
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
    80,
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
    81,
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
    82,
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
    83,
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
    84,
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
    85,
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
    86,
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
  (87, 'dump-db', 'dump-db', 'index', 0, '', 1, NULL, NULL);
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
  (88, 'dump-db', 'dump-db', 'index', 1, '', 2, NULL, NULL);
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
    89,
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
    90,
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
  (91, 'email', 'email', 'send', 0, '', 1, NULL, NULL);
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
  (92, 'email', 'email', 'send', 0, '', 2, NULL, NULL);
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
  (93, 'sync-db', 'sync-db', 'index', 0, '', 1, NULL, NULL);
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
  (94, 'sync-db', 'sync-db', 'index', 1, '', 2, NULL, NULL);
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
  (95, 'upload', 'upload', 'count', 0, '', 1, NULL, NULL);
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
  (96, 'upload', 'upload', 'count', 0, '', 2, NULL, NULL);
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
  (97, 'upload', 'upload', 'destroy', 0, '', 1, NULL, NULL);
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
  (98, 'upload', 'upload', 'destroy', 0, '', 2, NULL, NULL);
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
  (99, 'upload', 'upload', 'find', 0, '', 1, NULL, NULL);
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
  (100, 'upload', 'upload', 'find', 0, '', 2, NULL, NULL);
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
  (101, 'upload', 'upload', 'findone', 0, '', 1, NULL, NULL);
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
  (102, 'upload', 'upload', 'findone', 0, '', 2, NULL, NULL);
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
    104,
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
  (105, 'upload', 'upload', 'search', 0, '', 1, NULL, NULL);
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
  (106, 'upload', 'upload', 'search', 0, '', 2, NULL, NULL);
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
    108,
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
  (109, 'upload', 'upload', 'upload', 0, '', 1, NULL, NULL);
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
  (110, 'upload', 'upload', 'upload', 0, '', 2, NULL, NULL);
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
    112,
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
    113,
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
    114,
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
    115,
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
    116,
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
    117,
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
    118,
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
    119,
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
    120,
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
    121,
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
    122,
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
    123,
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
    124,
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
    125,
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
    126,
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
    127,
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
    128,
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
    129,
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
    130,
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
    131,
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
    132,
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
    133,
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
    134,
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
    135,
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
    136,
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
    137,
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
    138,
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
    139,
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
    140,
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
    141,
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
    142,
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
    143,
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
    144,
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
    145,
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
    146,
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
    147,
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
    148,
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
    149,
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
    150,
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
    151,
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
    152,
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
    153,
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
    154,
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
    155,
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
    156,
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
    157,
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
    158,
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
    159,
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
    160,
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
    161,
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
    162,
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
    163,
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
    164,
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
    165,
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
    166,
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
    167,
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
    168,
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
    169,
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
    170,
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
    171,
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
    172,
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
    173,
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
    174,
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
    175,
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
    176,
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
    177,
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
    178,
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
    179,
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
    180,
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
    181,
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
    182,
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
    183,
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
    184,
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
    185,
    'application',
    'project',
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
    186,
    'application',
    'project',
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
    187,
    'application',
    'project',
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
    188,
    'application',
    'project',
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
    189,
    'application',
    'project',
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
    190,
    'application',
    'project',
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
    191,
    'application',
    'project',
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
    192,
    'application',
    'project',
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
    193,
    'application',
    'project',
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
    194,
    'application',
    'project',
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
    195,
    'application',
    'project',
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
    196,
    'application',
    'project',
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
    197,
    'application',
    'flow-page',
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
    198,
    'application',
    'flow-page',
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
    199,
    'application',
    'flow-page',
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
    200,
    'application',
    'flow-page',
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
    201,
    'application',
    'flow-page',
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
    202,
    'application',
    'flow-page',
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
    203,
    'application',
    'flow-page',
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
    204,
    'application',
    'flow-page',
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
    205,
    'application',
    'flow-page',
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
    206,
    'application',
    'flow-page',
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
    207,
    'application',
    'flow-page',
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
    208,
    'application',
    'flow-page',
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

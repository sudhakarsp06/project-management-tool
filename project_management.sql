-- phpMyAdmin SQL Dump
-- version 3.4.10.1deb1
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Oct 24, 2014 at 11:46 AM
-- Server version: 5.5.38
-- PHP Version: 5.3.10-1ubuntu3.14

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `project_management`
--

-- --------------------------------------------------------

--
-- Table structure for table `attachments`
--

CREATE TABLE IF NOT EXISTS `attachments` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `post_id` bigint(20) NOT NULL,
  `post_type` varchar(20) NOT NULL,
  `name` varchar(255) NOT NULL,
  `label` varchar(255) NOT NULL,
  `created_date` date NOT NULL,
  `created_by` bigint(20) NOT NULL,
  `edited_date` date NOT NULL,
  `edited_by` bigint(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=11 ;

-- --------------------------------------------------------

--
-- Table structure for table `comments`
--

CREATE TABLE IF NOT EXISTS `comments` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `post_id` bigint(20) NOT NULL,
  `comment` text NOT NULL,
  `post_type` varchar(20) NOT NULL,
  `created_by` bigint(20) NOT NULL,
  `created_date` date NOT NULL,
  `edited_by` bigint(20) NOT NULL,
  `edited_date` date NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `priority`
--

CREATE TABLE IF NOT EXISTS `priority` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `created_date` date NOT NULL,
  `created_by` int(11) NOT NULL,
  `edited_by` int(11) NOT NULL,
  `edited_date` date NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `projects`
--

CREATE TABLE IF NOT EXISTS `projects` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `created_by` bigint(20) NOT NULL,
  `edited_by` bigint(20) NOT NULL,
  `created_date` date NOT NULL,
  `edited_date` date NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `projects_assign`
--

CREATE TABLE IF NOT EXISTS `projects_assign` (
  `project_id` bigint(20) NOT NULL,
  `assign_id` bigint(20) NOT NULL,
  UNIQUE KEY `project_id` (`project_id`,`assign_id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE IF NOT EXISTS `roles` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `page_url` varchar(255) NOT NULL,
  `role_key` varchar(255) NOT NULL,
  `is_public` tinyint(4) NOT NULL DEFAULT '0',
  `roles_group_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=46 ;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`id`, `name`, `page_url`, `role_key`, `is_public`, `roles_group_id`) VALUES
(1, 'User List', 'list_user', 'LIST_USER', 0, 1),
(2, 'Add User', 'create_user', 'CREATE_USER', 0, 1),
(3, 'Edit User', 'edit_user', 'EDIT_USER', 1, 1),
(4, 'Delete User', 'delete_user', 'DELETE_USER', 0, 1),
(5, 'List user Type', 'list_usertype', 'LIST_USERTYPE', 1, 2),
(6, 'Add User Type', 'create_usertype', 'CREATE_USERTYPE', 0, 2),
(7, 'Edit User Type', 'edit_usertype', 'EDIT_USERTYPE', 0, 2),
(8, 'Delete User Type', 'delete_user_type', 'DELETE_USERTYPE', 0, 2),
(14, 'List Roles', 'list_userrole', 'LIST_ROLES', 0, 3),
(13, 'Contact Us Page', 'contact', 'PAGE_CONTACT_US', 0, 4),
(12, 'About Us page', 'about', 'PAGE_ABOUT', 0, 4),
(15, 'Create Project', 'create_project', 'CREATE_PROJECT', 1, 5),
(16, 'Edit Project', 'edit_project', 'EDIT_PROJECT', 1, 5),
(17, 'Delete Project', 'delete_project', 'DELETE_PROJECT', 1, 5),
(18, 'List Project', 'list_project', 'LIST_PROJECT', 1, 5),
(19, 'Create Task Type', 'create_tasktype', 'CREATE_TASKTYPE', 1, 7),
(20, 'Edit Task Type', 'edit_tasktype', 'EDIT_TASKTYPE', 1, 7),
(21, 'Delete Task Type', 'delete_tasktype', 'DELETE_TASKTYPE', 1, 7),
(22, 'List Task Type', 'list_tasktype', 'LIST_TASKTYPE', 1, 7),
(23, 'List Status', 'list_status', 'LIST_STATUS', 1, 9),
(24, 'Create Status', 'create_status', 'CREATE_STATUS', 1, 9),
(25, 'Edit Status', 'edit_status', 'EDIT_STATUS', 1, 9),
(26, 'Delete Status', 'delete_status', 'DELETE_STATUS', 1, 9),
(27, 'List Tasks', 'list_tasks', 'LIST_TASK', 1, 6),
(28, 'Create Tasks', 'create_tasks', 'CREATE_TASK', 1, 6),
(29, 'Edit Tasks', 'edit_tasks', 'EDIT_TASK', 1, 6),
(30, 'Delete Tasks', 'delete_tasks', 'DELETE_TASK', 1, 6),
(31, 'List Comments', 'list_comments', 'LIST_COMMENTS', 1, 8),
(32, 'Create Comments', 'create_comments', 'CREATE_COMMENTS', 1, 8),
(33, 'Edit Comments', 'edit_comments', 'EDIT_COMMENTS', 1, 8),
(34, 'Delete Comments', 'delete_comments', 'DELETE_COMMENTS', 1, 8),
(35, 'View Project', 'view_project', 'VIEW_PROJECT', 1, 5),
(36, 'View Tasks', 'view_task', 'VIEW_TASK', 1, 6),
(41, 'Dashboard', 'dashboard', 'DASHBOARD', 1, 0),
(42, 'List Priority', 'list_priority', 'LIST_PRIORITY', 1, 10),
(43, 'Add Priority', 'add_priority', 'CREATE_PRIORITY', 1, 10),
(44, 'Edit Priority', 'edit_priority', 'EDIT_PRIORITY', 1, 10),
(45, 'Remove Priority', 'remove_priority', 'REMOVE_PRIORITY', 1, 10);

-- --------------------------------------------------------

--
-- Table structure for table `roles_groups`
--

CREATE TABLE IF NOT EXISTS `roles_groups` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `label` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=11 ;

--
-- Dumping data for table `roles_groups`
--

INSERT INTO `roles_groups` (`id`, `name`, `label`) VALUES
(1, 'User Operations', 'User'),
(2, 'User Type Operations', 'User Type'),
(3, 'Roles Section', 'Roles'),
(4, 'Static Pages', 'Static'),
(5, 'Project Operations', 'Project'),
(6, 'Task Operations', 'Task'),
(7, 'Task Type Operations', 'Task Type'),
(8, 'Comments Operations', 'Comments'),
(9, 'Status Operations', 'Status'),
(10, 'Priority Operations', 'Priority');

-- --------------------------------------------------------

--
-- Table structure for table `status`
--

CREATE TABLE IF NOT EXISTS `status` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `color` varchar(255) NOT NULL,
  `created_date` date NOT NULL,
  `created_by` int(11) NOT NULL,
  `edited_by` int(11) NOT NULL,
  `edited_date` date NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `tasks`
--

CREATE TABLE IF NOT EXISTS `tasks` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `details` text NOT NULL,
  `project_id` bigint(20) NOT NULL,
  `assigned_to` bigint(20) NOT NULL,
  `task_type_id` int(11) NOT NULL,
  `status_id` int(11) NOT NULL,
  `priority_id` bigint(20) NOT NULL,
  `created_by` bigint(20) NOT NULL,
  `created_date` date NOT NULL,
  `modified_by` bigint(20) NOT NULL,
  `modified_date` date NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `task_types`
--

CREATE TABLE IF NOT EXISTS `task_types` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `created_by` bigint(20) NOT NULL,
  `created_date` date NOT NULL,
  `edited_by` bigint(20) NOT NULL,
  `edited_date` date NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=5 ;

--
-- Dumping data for table `task_types`
--

INSERT INTO `task_types` (`id`, `name`, `created_by`, `created_date`, `edited_by`, `edited_date`) VALUES
(1, 'Feature', 0, '0000-00-00', 0, '0000-00-00'),
(2, 'Bug Fix', 0, '0000-00-00', 0, '0000-00-00'),
(3, 'New Task', 0, '0000-00-00', 0, '0000-00-00'),
(4, 'Open', 0, '0000-00-00', 0, '0000-00-00');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `useremail` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `superadmin` tinyint(4) NOT NULL,
  `user_type` tinyint(4) NOT NULL,
  `created_by` bigint(20) NOT NULL,
  `created_date` date NOT NULL,
  `edited_by` bigint(20) NOT NULL,
  `edited_date` date NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `users_sessions`
--

CREATE TABLE IF NOT EXISTS `users_sessions` (
  `users_id` bigint(20) NOT NULL,
  `session_id` varchar(255) NOT NULL,
  `activity` datetime NOT NULL,
  `logged` datetime NOT NULL,
  `user_data` text NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `user_types`
--

CREATE TABLE IF NOT EXISTS `user_types` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` varchar(255) NOT NULL,
  `created_date` date NOT NULL,
  `created_by` int(11) NOT NULL,
  `edited_by` int(11) NOT NULL,
  `edited_date` date NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=2 ;

--
-- Dumping data for table `user_types`
--

INSERT INTO `user_types` (`id`, `type`, `created_date`, `created_by`, `edited_by`, `edited_date`) VALUES
(1, 'Web Developer', '2014-10-24', 1, 1, '2014-10-24');

-- --------------------------------------------------------

--
-- Table structure for table `user_types_roles`
--

CREATE TABLE IF NOT EXISTS `user_types_roles` (
  `user_types_id` bigint(20) NOT NULL,
  `roles_id` bigint(20) NOT NULL,
  `yes` tinyint(4) NOT NULL DEFAULT '0'
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user_types_roles`
--

INSERT INTO `user_types_roles` (`user_types_id`, `roles_id`, `yes`) VALUES
(1, 1, 0),
(1, 2, 0),
(1, 3, 0),
(1, 4, 0),
(1, 5, 0),
(1, 6, 0),
(1, 7, 0),
(1, 8, 0),
(1, 12, 0),
(1, 13, 0),
(1, 14, 0),
(1, 15, 0),
(1, 16, 0),
(1, 17, 0),
(1, 18, 1),
(1, 19, 0),
(1, 20, 0),
(1, 21, 0),
(1, 22, 0),
(1, 23, 0),
(1, 24, 0),
(1, 25, 0),
(1, 26, 0),
(1, 27, 1),
(1, 28, 1),
(1, 29, 1),
(1, 30, 0),
(1, 31, 0),
(1, 32, 0),
(1, 33, 0),
(1, 34, 0),
(1, 35, 1),
(1, 36, 1),
(1, 42, 0),
(1, 43, 0),
(1, 44, 0),
(1, 45, 0);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

<?php
/**
 * Plugin Name: GOTE Advanced Plugin App
 * Description: Optimate your workflow. Search through, Create, Read, Update & Delete your Posts and Pages was never so easy. Until now! Test GOTE Advanced! G-ood O-ld T-ext E-ditor Advanced.
 * Author: JanQuery
 * Author URI: http://www.janquery.com
 * Version: 0.1
 * Plugin URI: 
 * License: GPL2+
 * Text Domain: wp-gote-advanced-plugin-app
 * Domain Path: /languages/
 */

define( 'SIMPLE_WP_ANGULARJS_STARTER_APP_DIR', plugin_dir_path( __FILE__ ) );
define( 'SIMPLE_WP_ANGULARJS_STARTER_APP_URL', plugin_dir_url( __FILE__ ) );
define( 'PLUGIN_VERSION', '0.1' );


require_once 'includes/admin_menu.php';
require_once 'includes/admin_js.php';

/*
 * ADMIN PAGE: Register and Create the Admin Page
 */
add_action( 'admin_menu', 'wp_gote_advanced_plugin_app_menu' );

/*
 * ADMIN APP: Enqueue JavaScript for application
 */

add_action( 'admin_enqueue_scripts', 'wp_gote_advanced_plugin_app_admin_scripts' );    

// show wp explicitly where to find language files
load_plugin_textdomain( 'wp-gote-advanced-plugin-app', false, dirname( plugin_basename( __FILE__ ) ) . '/languages/' );


?>
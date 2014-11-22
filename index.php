<?php include 'includes/config.php'; ?>
<!DOCTYPE html>
<html lang="en"  ng-app="UserManagment">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="description" content="">
    <meta name="author" content="">

    <!-- Note there is no responsive meta tag here -->

    <link rel="icon" href="../../favicon.ico">


    <title>Project Management Tool</title>

    <!-- Bootstrap core CSS -->
    <link href="css/bootstrap.min.css" rel="stylesheet">

    <!-- Custom styles for this template -->
    <link href="css/justified-nav.css" rel="stylesheet">
	<link href="css/override_bootstrap.css" rel="stylesheet">
	<link href="css/jquery-ui.min.css" rel="stylesheet">
	<link href="css/spectrum.css" rel="stylesheet">
  </head>
<script>
var pages_actions = <?php $content = file_get_contents( HTTP_PATH . 'api/getpages'); echo $content; ?>
</script>
  <body>

    <!-- Fixed navbar -->
	<div ng-controller="NavigateController">
		<div  class="navbar navbar-default navbar-fixed-top" role="navigation">
		  <div class="container">
			<div class="navbar-header">
			  <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
				<span class="sr-only">Toggle navigation</span>
				<span class="icon-bar"></span>
				<span class="icon-bar"></span>
				<span class="icon-bar"></span>
			  </button>
			  <a class="navbar-brand" href="#home">Angular Learning Project</a>
			</div>
			<div class="navbar-collapse collapse">
			  <ul class="nav navbar-nav">
				<li class="active"><a href="#home" bt-active>Home</a></li>				
				<li  ng-show="auth.loggedin"><a href="#dashboard" bt-active>Dashboard</a></li>	
				
			 </ul>
			 <ul class="nav navbar-nav navbar-right">
				<li ><a href="#login" ng-hide="auth.loggedin">Login</a></li>
			     <li ng-show="auth.loggedin" class="dropdown">
				  <a ng-show="auth.loggedin" href="javascript:;" class="dropdown-toggle" data-toggle="dropdown">Welcome {{user_details.username}} <span class="caret"></span></a>
				  <ul class="dropdown-menu" role="menu">
					<li bt-acl field="LIST_USER"  acl="access_control" ><a href="#{{pages.LIST_USER}}/1">Manage Users</a></li>
					<li bt-acl field="LIST_USERTYPE"  acl="access_control" ><a href="#{{pages.LIST_USERTYPE}}/1">Manage User Types</a></li>
					<li bt-acl field="LIST_ROLES"  acl="access_control"><a href="#{{pages.LIST_ROLES}}/1">Manage Pages</a></li>
					<li bt-acl field="LIST_PROJECT"  acl="access_control"><a href="#{{pages.LIST_PROJECT}}/1">Manage Projects</a></li>
					<li bt-acl field="LIST_TASKTYPE"  acl="access_control"><a href="#{{pages.LIST_TASKTYPE}}/1">Manage Task Types</a></li>
					<li bt-acl field="LIST_STATUS"  acl="access_control"><a href="#{{pages.LIST_STATUS}}/1">Manage Status</a></li>
					<li bt-acl field="LIST_TASK"  acl="access_control"><a href="#{{pages.LIST_TASK}}/1">Manage Tasks</a></li>
					<li bt-acl field="LIST_PRIORITY"  acl="access_control"><a href="#{{pages.LIST_PRIORITY}}/1">Manage Priority</a></li>
					<li bt-acl field="LIST_MILESTONE"  acl="access_control"><a href="#{{pages.LIST_MILESTONE}}/1">Manage Milestones</a></li>
					<li class="divider"></li>					
					<li><a href="#logout" ng-click="logout();">Logout</a></li>
				  </ul>
				</li>
			 </ul>
			</div><!--/.nav-collapse -->
		  </div>
		</div>
		<div class="row">
			<div class="col-md-7 col-md-offset-1">
			<p id="app_error" class="alert alert-danger" style="margin-top:38px;margin-bottom:-42px;" nt-timer  message="response.error"  ng-show="response.error">{{response.error}}</p>
			<p id="app_success" class="alert alert-success" style="margin-top:38px;margin-bottom:-42px;" nt-timer  message="response.success" ng-show="response.success">{{response.success}}</p>
			</div>
		</div>
		<div class="container">
			
			<div class="page-header" ng-view></div>
		  
		</div> <!-- /container -->
	</div>

    <!-- Bootstrap core JavaScript
    ================================================== -->
    <!-- Placed at the end of the document so the pages load faster -->
    <!-- Placed at the end of the document so the pages load faster -->
	<script src="js/jquery.min.js"></script>
	<script src="js/jquery-ui.min.js"></script>
	<script src="js/spectrum.js"></script>
	<script src="js/bootstrap.min.js"></script>
	<script src="js/fieldManager.js"></script>
	<script src="js/chart.js"></script>
	<script src="lib/angular/angular.js"></script>
	<script src="lib/angular/angular-route.js"></script>
	<script src="lib/angular/angular-resource.js"></script>
	<script src="lib/angular/angular-cookies.js"></script>
	<script src="lib/angular/angular-translate.js"></script>
	<script src="lib/angular/angular-ui-router.min.js"></script>
	
	<script src="js/app.js"></script>
	<script src="js/filters/filters.js"></script>

	<script src="js/translate/translate.js"></script>
	<script src="js/services/Loginservices.js"></script>
	<script src="js/services/UserServices.js"></script>
	<script src="js/services/UsertypeServices.js"></script>
	<script src="js/services/Storageservices.js"></script>
	<script src="js/services/ValidationService.js"></script>
	<script src="js/services/GeneralServices.js"></script>
	<script src="js/services/RolesServices.js"></script>
	<script src="js/services/AccessServices.js"></script>
	<script src="js/services/ProjectsServices.js"></script>
	<script src="js/services/TasktypeServices.js"></script>
	<script src="js/services/StatusServices.js"></script>
	<script src="js/services/PriorityServices.js"></script>
	<script src="js/services/TaskServices.js"></script>
	<script src="js/services/CommentServices.js"></script>
	<script src="js/services/MilestoneServices.js"></script>
	
	<script src="js/controllers/HomeController.js"></script>
	<script src="js/controllers/LoginController.js"></script>	
	<script src="js/controllers/ErrorController.js"></script>
	<script src="js/controllers/NavigationController.js"></script>
	<script src="js/controllers/UsermanagerController.js"></script>
	<script src="js/controllers/UsertypemanagerController.js"></script>
	<!--script src="js/controllers/ProjectmanagerController.js"></script-->
	<script src="js/controllers/RolesrmanagerController.js"></script>
	<script src="js/controllers/ProjectsController.js"></script>
	<script src="js/controllers/TasktypemanagerController.js"></script>
	<script src="js/controllers/StatusmanagerController.js"></script>
	<script src="js/controllers/PrioritymanagerController.js"></script>
	<script src="js/controllers/TaskmanagerController.js"></script>
	<script src="js/controllers/CommentController.js"></script>
	<script src="js/controllers/MilestonemanagerController.js"></script>
	<script src="js/uploader.js"></script>
	
	<script src="js/directives/makeActiveDirective.js"></script>
	<script src="js/directives/notifyDirective.js"></script>	
	<script src="js/directives/paginationDirective.js"></script>
	<script src="js/directives/availabilityDirective.js"></script>
	<script src="js/directives/accesscontrolDirective.js"></script>
	<script src="js/directives/autosuggestDirective.js"></script>
	
  </body>
</html>

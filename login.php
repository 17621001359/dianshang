<?php
	header("content-type","text/html;charset=utf-8");
	
	//1接收数据
	$username = $_POST["username"];
	$userPass = $_POST["userpass"];
	
	//2、在数据库中查询
	   //1)、建立连接，并选择数据库
	   $con = mysqli_connect("localhost","root","root","dianshang");
	//    mysql_select_db(,$con);
	   //2)、执行SQL语句（查询）
	   $sqlStr="select * from vip where username='$username' and userPass='$userPass'";
	   
	   $result=mysqli_query($con,$sqlStr);
	   
	   //3)、关闭连接
	   mysqli_close($con);
	//3、响应结果
	//获得$result的行数
	$rows = mysqli_num_rows($result);
	if($rows>0){//登录成功
		echo "success";	
	}else {//登录失败，返回0.
		echo "fail";
	}	
?>
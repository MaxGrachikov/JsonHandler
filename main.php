<?php
	
	 function addComment($hostname) {
	 	if ($hostname) {
		 	$file_json = file_get_contents("inbalancer.json");
			$json_object = json_decode($file_json, true);
			for ($i=0; $i < count($json_object["nginx::nginx_upstreams"]["nginx-pip"]["members"]); $i++) {
				if ($hostname == $json_object["nginx::nginx_upstreams"]["nginx-pip"]["members"][$i]) {
					$json_object["nginx::nginx_upstreams"]["nginx-pip"]["members"][$i] = '#'.$json_object["nginx::nginx_upstreams"]["nginx-pip"]["members"][$i];
				 } 
			}

			$json_object = json_encode($json_object, JSON_PRETTY_PRINT);
			file_put_contents("inbalancer.json", $json_object);
		}
	 }

	 function removeComment($hostname) {
	 	$hostname = '#'.$hostname;
	 	echo $hostname;
	 	if ($hostname) {
		 	$file_json = file_get_contents("inbalancer.json");
			$json_object = json_decode($file_json, true);
			for ($i=0; $i < count($json_object["nginx::nginx_upstreams"]["nginx-pip"]["members"]); $i++) {
				 if ($hostname == $json_object["nginx::nginx_upstreams"]["nginx-pip"]["members"][$i]) {
					$json_object["nginx::nginx_upstreams"]["nginx-pip"]["members"][$i] = substr($json_object["nginx::nginx_upstreams"]["nginx-pip"]["members"][$i], 1);
				 }
			}
			$json_object = json_encode($json_object, JSON_PRETTY_PRINT);
			file_put_contents("inbalancer.json", $json_object);
		}
	 }

	function addHost($hostname) {
		if ($hostname) {
	 		$file_json = file_get_contents("inbalancer.json");
			$json_object = json_decode($file_json, true);
			if(in_array($hostname, $json_object["nginx::nginx_upstreams"]["nginx-pip"]["members"])){
				echo "Такой элемент уже имеется";
			}
			else {
					array_push($json_object["nginx::nginx_upstreams"]["nginx-pip"]["members"], $hostname);
				}
				$json_object = json_encode($json_object, JSON_PRETTY_PRINT);
				file_put_contents("inbalancer.json", $json_object);
			}
	}

	function removeHost($hostname) {
		if ($hostname) {
		 	$file_json = file_get_contents("inbalancer.json");
			$json_object = json_decode($file_json, true);
			if(in_array($hostname, $json_object["nginx::nginx_upstreams"]["nginx-pip"]["members"])) {
				$key = array_search($hostname, $json_object["nginx::nginx_upstreams"]["nginx-pip"]["members"]);
				array_splice($json_object["nginx::nginx_upstreams"]["nginx-pip"]["members"],$key,1);
			
			}
			$json_object = json_encode($json_object, JSON_PRETTY_PRINT);
			file_put_contents("inbalancer.json", $json_object);
		}
	}

	$json_str = file_get_contents('php://input');
	$json = json_decode($json_str, true);
	switch($json["operation"]) {
		case "addHost":
			addHost($json["listHostname"]);
			break;
	}
?>

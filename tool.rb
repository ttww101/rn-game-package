require 'pathname'
RUN_PATH = Pathname.new(File.dirname(__FILE__)).realpath
PROJECT_PATH = RUN_PATH
CONFIG_JS_PATH = "#{RUN_PATH}/Game/config.js"
APPDELEGATE_M_PATH = "#{RUN_PATH}/ios/Game/AppDelegate.m"
PROJECT_INFO_PATH = "#{RUN_PATH}/ios/fastlane/Projectinfo.rb"
APPFILE_PATH = "#{RUN_PATH}/ios/fastlane/Appfile"

def get_str_from_file(path)
	txt = File.open(path)
	str = txt.read()
	return str
end

def set_config_js(key, value)
	filename = CONFIG_JS_PATH
	str = get_str_from_file filename
	obj = str.split("\n")
	obj.each_with_index { |item, index|
		if item.include? key
			obj[index] = "  #{key}: \"#{value}\","
		end
	}
	outcome_str = obj.join "\n"
	open(CONFIG_JS_PATH, 'w') { |f|
	  f.puts outcome_str
	}
end

def set_push_key(value)
	filename = APPDELEGATE_M_PATH
	str = get_str_from_file filename
	obj = str.split("\n")
	obj.each_with_index { |item, index|
		if item.include? "appKey = "
			obj[index] = "  NSString *appKey = @\"#{value}\";"
		end
	}
	outcome_str = obj.join "\n"
	open(APPDELEGATE_M_PATH, 'w') { |f|
	  f.puts outcome_str
	}
end

def set_project_info(name)
	str = get_str_from_file PROJECT_INFO_PATH
	obj = str.split("\n")
	obj[2] = "APP_NAME = \"#{name}\""
	outcome_str = obj.join "\n"
	open(PROJECT_INFO_PATH, 'w') { |f|
	  f.puts outcome_str
	}
end

def set_appfile(key, value)
	str = get_str_from_file APPFILE_PATH
	obj = str.split("\n")

	if key == "app_identifier"
		obj[0] = "app_identifier \"#{value}\""
	elsif key == "apple_id"
		obj[0] = "apple_id \"#{value}\""
	end
	outcome_str = obj.join "\n"
	open(APPFILE_PATH, 'w') { |f|
	  f.puts outcome_str
	}
end

$display_name = -> value {
	# Projectinfo.rb
	set_project_info value
	# xcconfig
	system "cd #{PROJECT_PATH}/ios/fastlane && fastlane xcconfig"
}

$bundle_id = -> value {
	# Appfile
	set_appfile "app_identifier", value
	# xcconfig
	system "cd #{PROJECT_PATH}/ios/fastlane && fastlane xcconfig"
}

$game_url = -> value {
	# config.js
	set_config_js "game_url", value
}

$apple_id = -> value {
	# Appfile
	set_appfile "apple_id", value
}

$app_icon = -> value {
	# gen_appicon
	"cd #{PROJECT_PATH}/ios/fastlane && sips -s format png --out gen.png #{value}"
	system "cd #{PROJECT_PATH}/ios/fastlane && fastlane gen_appicon"
}

$leancloud_id = -> value {
	# config.js
	set_config_js "leancloud_id", value
}

$leancloud_key = -> value {
	# config.js
	set_config_js "leancloud_key", value
}

$jiguang = -> value {
	set_push_key value
}

$injection_js_code = -> value {
}
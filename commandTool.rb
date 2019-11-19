require_relative "tool.rb"

c = {
	display_name: $display_name,
	bundle_id: $bundle_id,
	game_url: $game_url,
	apple_id: $apple_id,
	app_icon: $app_icon,
	leancloud_id: $leancloud_id,
	leancloud_key: $leancloud_key
}

if ARGV.count == 0
	puts "interactive mode"
	# game part
	vv = {
		"apple id": $apple_id,
		"bundle id": $bundle_id,
		"game url": $game_url,
		"game icon": $app_icon,
		"game name": $display_name,
		"game jiguang app id": $jiguang,
		"game LeanCloud App id": $leancloud_id,
		"game LeanCloud App key": $leancloud_key,
	}
	vv.each { |key, func|
		puts "Enter your #{key}:"
		value1 = gets.delete "\n"
		if value1 != ""
			func.(value1)
		end
	}
end


for argv in ARGV
	parm = argv.split(":")

	value1 = parm[1].delete "\"'"

	c.each { |key, func|
		if key.to_s == parm[0]
			puts key
			func.(value1)
		end
	}
end
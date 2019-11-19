require_relative "Projectinfo"
# precondition:
# Fastfile 

desc "Description of what the lane does"
lane :show_project_info do
  fastlane_require "spaceship"
  Spaceship.login

  UI.message "👉👉👉 Appfile 👈👈👈"
  UI.important "1. app_identifier :#{IDENTIFIER}"
  UI.important "2. apple_id       :#{APPLE_ID}"
  UI.message "👉👉👉 Projectinfo.rb 👈👈👈"
  UI.important "1. APP_NAME       :#{APP_NAME}"
  UI.message "👉👉👉 config.xcconfig 👈👈👈"
  configuration_file = "../config.xcconfig"

  # Read values from the .xcconfig file
  configuration = Xcodeproj::Config.new(configuration_file)
  UI.important "1. RN_APP_ICON     :#{configuration.attributes['RN_APP_ICON']}"
  UI.important "2. RN_BUILD_NUMBER :#{configuration.attributes['RN_BUILD_NUMBER']}"
  UI.important "3. RN_BUNDLE_ID    :#{configuration.attributes['RN_BUNDLE_ID']}"
  UI.important "4. RN_DISPLAY_NAME :#{configuration.attributes['RN_DISPLAY_NAME']}"
  UI.important "5. RN_PUSH_APP_KEY :#{configuration.attributes['RN_PUSH_APP_KEY']}"
  UI.important "6. RN_VERSION      :#{configuration.attributes['RN_VERSION']}"
  
  UI.message "👉👉👉 Spaceship 👈👈👈"
  path = File.expand_path "~/.fastlane/spaceship/"
  has_cookie = Dir.entries(path).include? APPLE_ID
  UI.important "1. has cookie      :#{has_cookie}"

  # sign
  UI.message "👉👉👉 Xcode Build Setting 👈👈👈"
  path = '../Game.xcodeproj'
  project = Xcodeproj::Project.open(path)
  target = project.targets.first
  build_configuration = target.build_configurations[1]
  code_sign_style = build_configuration.resolve_build_setting('CODE_SIGN_STYLE')
  code_sign_identity = build_configuration.resolve_build_setting('CODE_SIGN_IDENTITY')
  provisioning_profile = build_configuration.resolve_build_setting('PROVISIONING_PROFILE')
  development_team = build_configuration.resolve_build_setting('DEVELOPMENT_TEAM')
  UI.important "1. code_sign_style     :#{code_sign_style}"
  UI.important "2. code_sign_identity  :#{code_sign_identity}"
  UI.important "3. provisioning_profile:#{provisioning_profile}"
  UI.important "4. auto_sign_team      :#{development_team}"
  

  UI.message "👉👉👉 App Store Connect 👈👈👈"
  team_id = Spaceship::Portal.client.team_id
  UI.important "1. team_id             :#{team_id}"
  
  Spaceship::Tunes.login
  all_app = Spaceship::Tunes::Application.all
  all_app.each do |app|
    app_name =  app.name
    bundle_id = app.bundle_id
    issues_count = app.issues_count
    result_str = "#{app_name}/#{bundle_id}/#{issues_count}"
    UI.important result_str
  end

  # if UI.confirm("Do you want to show app icon?")
  #   sh "open ../Game/Images.xcassets/AppIcon.appiconset/AppIcon-1024.0x1024.0@1x.png"
  # end
end

lane :revoke_all_dis_cer do
  # Production identities
  prod_certs = Spaceship::Portal.certificate.production.all

  # Development identities
  dev_certs = Spaceship::Portal.certificate.development.all

  prod_certs.each { |cer|
    cer.revoke!
  }
end

lane :gen_cer do
  cert
  import_certificate(certificate_path: "#{SharedValues::CERT_FILE_PATH}")
end

lane :gen_provisioning_profile do
  sigh template_name: "../Game/Game.entitlements"
  # path = SharedValues::SIGH_PROFILE_PATH
  # install_provisioning_profile(path: "AppStore_net.game.threed.football.kick.mobileprovision")
  # sh "open ~/Library/MobileDevice/Provisioning\\ Profiles"
  # UI.message "profile path: #{path}"
  update_project_provisioning(
    xcodeproj: "Game.xcodeproj",
    # profile: "932bc928-abbc-42a4-b03f-c4605ade5a61", # optional if you use sigh
    target_filter: "Game", # matches name or type of a target
    build_configuration: "Release",
    # code_signing_identity: "iPhone Development" # optionally specify the codesigning identity
    # iOS Developer/iOS Distribution
  )
end

lane :xcconfig do
  fastlane_require 'Xcodeproj'
  # Compose .xcconfig file path
  configuration_file = "../config.xcconfig"

  # Read values from the .xcconfig file
  configuration = Xcodeproj::Config.new(configuration_file)
  configuration.attributes['RN_DISPLAY_NAME'] = APP_NAME
  configuration.attributes['RN_BUNDLE_ID'] = IDENTIFIER

  # configuration.save_as(configuration_file)
  absolute_path = File.expand_path(configuration_file)
  UI.message absolute_path
  # configuration.save_as(absolute_path)
  UI.message configuration.to_s
  open(configuration_file, 'w') { |f|
    f.puts configuration.to_s
  }
end
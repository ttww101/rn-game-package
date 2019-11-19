require_relative "Projectinfo"
# precondition
# 1. ipa
# 2. Appfile
# 3. Projectinfo
# 4. gen.png
# 5. cookie

# what is this do?
# 1. create new app in app store connect
# 2. use xcode project build ipa
# 3. 

lane :add_app_to_app_store_connect do
	produce(
  	username: APPLE_ID,
    app_name: APP_NAME,
    language: 'English_UK',
    app_version: '1.0',
    enable_services: {
      push_notification: "on",
    }
	)
end

lane :bild_ipa do
  gym(
    scheme: "Game Release",
    export_options: {
      method: "app-store",
      provisioningProfiles: { 
        identifier => "AppStore_#{identifier}",
      }
    }
  )
end

lane :build_simulator_ipa do
  gym(
    scheme: "Game" ,
    workspace: "Game.xcworkspace",
    output_directory: "../output_directory",
    output_name: "IPA_Name.ipa",
    xcargs: "ARCHIVE=YES" # Used to tell the Fabric run script to upload dSYM file
  )

  system "xcrun ditto -xk ipa ./"
  system "xcrun simctl install booted .app"
  system "xcrun simctl launch booted bundleId"
end

lane :get_privacy_url do
  fastlane_require 'rest-client'
  params = {
    '_tokenƒwpbUS358effYg4fLH69JZ6BvXcmCZijFDUBZZ0V8':nil,
    'agreement_for[]':'Mobile app',
    'company_name':nil,
    'owned_by_company':'No',
    'country':'China',
    'state_us':nil,
    'state_au':nil,
    'state_ca':nil,
    'state_de':nil,
    'state_in':nil,
    'website_url':nil,
    'website_name':nil,
    'mobile_APP_NAME':APP_NAME,
    'types_of_data_collected[]':'Others',
    'clause_communications_unsubscribe_method[]':'By clicking the Unsubscribe link',
    'clause_location_data':'No',
    'service_providers_analytics':'No',
    'service_providers_payments':'No',
    'service_providers_advertising':'No',
    'service_providers_behavioral_remarketing':'No',
    'clause_disclosure_for_law_enforcement':'No',
    'clause_business_transaction':'No',
    'compliance_gdpr':'No',
    'compliance_caloppa':'No',
    '___company_contact[]':'Email',
    'company_contact[email]':APPLE_ID,
    'company_contact[link]':nil,
    'company_contact[phone]':nil,
    'company_contact[address]':nil,
    'email_address':'useless@sdlf.com',
    'eu':'0',
    'payment_method':'fastspring',
    'agreement_type':'PolicyFREE',
    'agreement_variant':'1',
    'agreement_lang':'EN',
    'builder-submit':'Create Privacy Policy'
  }

  r = RestClient.post('https://app.privacypolicies.com/builder/process', params)

  # UI.message "http://app.privacypolicies.com" + r.body[80..144]
  # UI.message "https://www.privacypolicies.com/privacy/view/" + r.body[113..144]
  "https://www.privacypolicies.com/privacy/view/" + r.body[113..144]
end

lane :gen_appicon do
  sh "./appicon gen.png"
  sh "cp -rf AppIcon.appiconset ../Game/Images.xcassets"
  sh "rm -r AppIcon.appiconset"
end

lane :upload_metadata do
  privacy_url = get_privacy_url
  UI.message privacy_url

  fastlane_require "spaceship"
  Spaceship.login
  
  username = Spaceship::Portal.client.provider.name.split
  UI.message username
  family_name = username[1]
  given_name = username[0]
  full_name = "#{given_name} #{family_name}"
	upload_to_app_store(
	  force: true, # Set to true to skip PDF verification
	  price_tier: 0,
    copyright: "Copyright © 2019 #{full_name}",
    privacy_url: {'en-GB': privacy_url},
    support_url: {'en-GB': privacy_url},
    app_rating_config_path: 'fastlane/metadata/itunes_rating_config.json',
    automatic_release: true,
    run_precheck_before_submit: false
	)
end

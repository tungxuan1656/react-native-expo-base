fastlane documentation
----

# Installation

Make sure you have the latest version of the Xcode command line tools installed:

```sh
xcode-select --install
```

For _fastlane_ installation instructions, see [Installing _fastlane_](https://docs.fastlane.tools/#installing-fastlane)

# Available Actions

### update_gg_services_ios

```sh
[bundle exec] fastlane update_gg_services_ios
```

Update GoogleService-Info.plist

### update_gg_services_android

```sh
[bundle exec] fastlane update_gg_services_android
```

Update google-services.json

### update_app_name_android

```sh
[bundle exec] fastlane update_app_name_android
```



### update_default_config_android

```sh
[bundle exec] fastlane update_default_config_android
```



----


## Android

### android update_icon

```sh
[bundle exec] fastlane android update_icon
```



### android build

```sh
[bundle exec] fastlane android build
```

Build APK application.

### android build_store

```sh
[bundle exec] fastlane android build_store
```

Build store application.

### android upload

```sh
[bundle exec] fastlane android upload
```

Upload Appcenter

### android config

```sh
[bundle exec] fastlane android config
```

Config

### android config_development

```sh
[bundle exec] fastlane android config_development
```

Config android with env

### android config_production

```sh
[bundle exec] fastlane android config_production
```

Config android with env

### android development

```sh
[bundle exec] fastlane android development
```

Build Iternal app and upload to App Center

### android production

```sh
[bundle exec] fastlane android production
```

Build Production.

### android store

```sh
[bundle exec] fastlane android store
```

Build Store.

----


## iOS

### ios update_icon

```sh
[bundle exec] fastlane ios update_icon
```



### ios update_info

```sh
[bundle exec] fastlane ios update_info
```

Update config

### ios build

```sh
[bundle exec] fastlane ios build
```

Build IPA application

### ios upload

```sh
[bundle exec] fastlane ios upload
```

Upload to App Center.

### ios config

```sh
[bundle exec] fastlane ios config
```

Config

### ios config_development

```sh
[bundle exec] fastlane ios config_development
```

Config android with env

### ios config_production

```sh
[bundle exec] fastlane ios config_production
```

Config android with env

### ios development

```sh
[bundle exec] fastlane ios development
```

Build testing and upload to App Center.

### ios production

```sh
[bundle exec] fastlane ios production
```

Build Production.

----


## switch

### switch development

```sh
[bundle exec] fastlane switch development
```

Switch env

### switch production

```sh
[bundle exec] fastlane switch production
```



----

This README.md is auto-generated and will be re-generated every time [_fastlane_](https://fastlane.tools) is run.

More information about _fastlane_ can be found on [fastlane.tools](https://fastlane.tools).

The documentation of _fastlane_ can be found on [docs.fastlane.tools](https://docs.fastlane.tools).

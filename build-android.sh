#!/bin/bash
echo "Building android bundles..."
react-native link
mkdir -p android/app/src/main/assets/
react-native bundle --platform android --reset-cache --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res/
# rm -rf android/app/src/main/res/drawable-*
# cd android && ./gradlew assembleRelease
# cd ..
# react-native run-android
echo "Bundle gerado, agora é só abrir o Android Studio e compilar o app."

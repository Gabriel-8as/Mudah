#!/bin/bash
echo "iOS building bundles..."
react-native link
react-native bundle --entry-file index.js --platform ios --dev false --bundle-output ios/main.jsbundle --assets-dest ios
echo "Bundle gerado, agora é só compilar o projeto usando o xCode."


#!/bin/bash
cat << 'EOF' >.vscode/settings.json
{
    "extensions.ignoreRecommendations": true
}
EOF
cat << 'EOF' > .git/hooks/post-commit
#!/bin/bash
git push
git log -1 --shortstat > history_log.txt
EOF
chmod +x .git/hooks/post-commit
code --uninstall-extension revature-labs-non-prod.revature-angular-labs-non-prod && code --uninstall-extension hbenl.vscode-test-explorer && code --uninstall-extension ms-vscode.test-adapter-converter &&  code --uninstall-extension vscjava.vscode-java-test
code --install-extension redhat.java@1.29.0 && code --install-extension revaturePro.revature-labs
node chromedriverVersion.js
wget https://storage.googleapis.com/chrome-for-testing-public/$(cat LATEST_RELEASE | cut -d '.' -f 1-3).0/win32/chromedriver-win32.zip
 if [ $? -eq 0 ]; then
	 mkdir driver && unzip chromedriver-win32.zip && mv chromedriver-win32/chromedriver.exe driver && rm LATEST_RELEASE && rm chromedriver-win32.zip && rm -r chromedriver-win32
else
  wget https://googlechromelabs.github.io/chrome-for-testing/LATEST_RELEASE_STABLE && mv LATEST_RELEASE_STABLE LATEST_RELEASE
  if [ ! -f ./chromedriver-win32.zip ]; then
    wget https://storage.googleapis.com/chrome-for-testing-public/$(cat LATEST_RELEASE)/win32/chromedriver-win32.zip
    unzip chromedriver-win32.zip && mv chromedriver-win32/chromedriver.exe driver && rm LATEST_RELEASE && rm chromedriver-win32.zip && rm -r chromedriver-win32
  fi
fi
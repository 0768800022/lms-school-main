echo "Deploy starting..."
source ~/.nvm/nvm.sh

yarn

rm -rf ../build
mv ../deploy ../build

pm2 startOrReload ecosystem.config.js --update-env

echo "Deploy done."
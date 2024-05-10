# Update apt
apt update

# Install sqlite3
apt install sqlite3 npm

# Install golang
wget https://go.dev/dl/go1.22.3.linux-amd64.tar.gz
rm -rf /usr/local/go && tar -C /usr/local -xzf go1.22.3.linux-amd64.tar.gz
# export PATH=$PATH:/usr/local/go/bin

sqlite3 activities.db < create_database.sql

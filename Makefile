# --- CONFIGURATION ---
VENV_DIR      = $(shell pwd)/.venv
VENV_PYTHON   = $(VENV_DIR)/bin/python3
VENV_NPM      = $(VENV_DIR)/bin/npm
VENV_NODEENV  = $(VENV_DIR)/bin/nodeenv

# Destinations
SCSS_DATA_DIR = $(HOME)/.local/share/Color-My-Gnome/scss
BIN_DIR       = $(HOME)/.local/bin
DESKTOP_FILE  = $(HOME)/.local/share/applications/color-my-gnome.desktop
APP_PATH      = $(shell pwd)

.PHONY: install setup clean

# --- MAIN INSTALL TARGET ---
install: setup
	@echo "Installing SCSS partials to $(SCSS_DATA_DIR)..."
	@mkdir -p $(SCSS_DATA_DIR)
	# Installs all .scss files from your local project scss/ folder
	install -m 644 scss/*.scss $(SCSS_DATA_DIR)

	@echo "Installing scripts to $(BIN_DIR)..."
	@mkdir -p $(BIN_DIR)
	# Install the bash script and the python GUI script
	install -m 755 color-my-gnome.sh $(BIN_DIR)/color-my-gnome
	install -m 755 lib_gui.py $(BIN_DIR)/lib_gui.py

	@echo "Creating desktop launcher..."
	@mkdir -p $(HOME)/.local/share/applications
	@echo "[Desktop Entry]" > $(DESKTOP_FILE)
	@echo "Type=Application" >> $(DESKTOP_FILE)
	@echo "Name=Color My Gnome" >> $(DESKTOP_FILE)
	@echo "Comment=GNOME Theme Manager" >> $(DESKTOP_FILE)
	# Exec calls the VENV python directly using the script in BIN_DIR
	@echo "Exec=$(VENV_PYTHON) $(BIN_DIR)/lib_gui.py" >> $(DESKTOP_FILE)
	@echo "Icon=$(APP_PATH)/icon.png" >> $(DESKTOP_FILE)
	@echo "Terminal=false" >> $(DESKTOP_FILE)
	@echo "Categories=Settings;GNOME;GTK;" >> $(DESKTOP_FILE)
	@chmod +x $(DESKTOP_FILE)
	@echo "Refreshing GNOME desktop database..."
	# 1. Update the app grid launcher database
	@update-desktop-database $(HOME)/.local/share/applications

	# 2. Force an icon cache update (assuming your icon is in a standard local path)
	# This 'touch' trick often forces GNOME to re-scan the directory
	@touch $(HOME)/.local/share/icons 2>/dev/null || true
	@gtk-update-icon-cache -f -t $(HOME)/.local/share/icons 2>/dev/null || true
	@echo "Installation successful! Launch 'Color My Gnome' from your App Grid."

# --- SETUP: VENV + NODE + SASS ---
setup:
	@echo "Checking system dependencies..."
	@pkg-config --exists gtk4 libadwaita-1 || { echo "Error: libadwaita-1-dev missing"; exit 1; }

	@echo "Building Virtual Environment..."
	@python3 -m venv $(VENV_DIR)
	@$(VENV_DIR)/bin/pip install --upgrade pip PyGObject nodeenv

	@echo "Integrating Node.js into venv..."
	@$(VENV_NODEENV) -p

	@echo "Installing Sass locally into $(SCSS_DATA_DIR)..."
	@mkdir -p $(SCSS_DATA_DIR)
	@$(VENV_NPM) install sass --prefix $(SCSS_DATA_DIR)

clean:
	@echo "Removing installation..."
	rm -rf $(VENV_DIR)
	rm -f $(DESKTOP_FILE)
	rm -f $(BIN_DIR)/color-my-gnome.sh
	rm -f $(BIN_DIR)/lib_gui.py

uninstall:
	@echo "Removing Color My Gnome installation..."
	# Remove the data folder (SCSS partials and local Sass)
	rm -rf $(HOME)/.local/share/Color-My-Gnome
	# Remove the scripts
	rm -f $(HOME)/.local/bin/color-my-gnome.sh
	rm -f $(HOME)/.local/bin/lib_gui.py
	# Remove the launcher
	rm -f $(HOME)/.local/share/applications/color-my-gnome.desktop
	# Update the desktop database so the icon disappears
	@update-desktop-database $(HOME)/.local/share/applications
	@echo "Uninstall complete."

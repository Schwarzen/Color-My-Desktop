# --- CONFIGURATION ---
# Use a stable, persistent directory for the app's environment
APP_DATA_DIR  = $(HOME)/.local/share/Color-My-Gnome
VENV_DIR      = $(APP_DATA_DIR)/.venv
VENV_PYTHON   = $(VENV_DIR)/bin/python3
VENV_NPM      = $(VENV_DIR)/bin/npm
VENV_NODEENV  = $(VENV_DIR)/bin/nodeenv

# Destinations
SCSS_DATA_DIR = $(APP_DATA_DIR)/scss
BIN_DIR       = $(HOME)/.local/bin
DESKTOP_FILE  = $(HOME)/.local/share/applications/Color-My-Gnome.desktop

.PHONY: install setup clean uninstall

# --- MAIN INSTALL TARGET ---
install: setup
	@echo "Installing SCSS partials..."
	@mkdir -p $(SCSS_DATA_DIR)
	install -m 644 scss/*.scss $(SCSS_DATA_DIR)

	@echo "Installing scripts to $(BIN_DIR)..."
	@mkdir -p $(BIN_DIR)
	# Copy files to the stable APP_DATA_DIR so they never disappear
	cp lib_gui.py $(APP_DATA_DIR)/lib_gui.py
	install -m 755 color-my-gnome.sh $(BIN_DIR)/color-my-gnome

	@echo "Creating desktop launcher..."
	@echo "[Desktop Entry]" > $(DESKTOP_FILE)
	@echo "Type=Application" >> $(DESKTOP_FILE)
	@echo "Name=Color My Gnome" >> $(DESKTOP_FILE)
	@echo "Comment=GNOME Theme Manager" >> $(DESKTOP_FILE)
	# Point to the STABLE venv and STABLE script location
	@echo "Exec=$(VENV_PYTHON) $(APP_DATA_DIR)/lib_gui.py" >> $(DESKTOP_FILE)

	@echo "Terminal=false" >> $(DESKTOP_FILE)
	@echo "Categories=Settings;GNOME;GTK;" >> $(DESKTOP_FILE)

	@update-desktop-database $(HOME)/.local/share/applications
	@echo "Installation successful! You can now launch Color-My-Gnome from the app list."

# --- SETUP: VENV + NODE + SASS ---
setup:
	@echo "Building Virtual Environment in stable location..."
	@mkdir -p $(APP_DATA_DIR)
	# Recreate venv in the persistent path
	@python3 -m venv $(VENV_DIR)
	@$(VENV_DIR)/bin/pip install --upgrade pip PyGObject nodeenv
	@$(VENV_NODEENV) -p
	@$(VENV_NPM) install sass --prefix $(APP_DATA_DIR)
	# Copy icon to stable location



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

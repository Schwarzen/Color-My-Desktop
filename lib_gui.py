import gi
import os
import re
import subprocess
import threading

gi.require_version('Gtk', '4.0')
gi.require_version('Adw', '1')
from gi.repository import Gtk, Adw, Gdk

# --- CONFIGURATION ---
SCSS_DIR = os.path.expanduser("~/.local/share/Color-My-Gnome/scss")
BASH_SCRIPT = os.path.expanduser("~/.local/bin/color-my-gnome")
themes = [f[1:-5] for f in os.listdir(SCSS_DIR) if f.startswith('_') and f.endswith('.scss')]

preview_css_provider = Gtk.CssProvider()
Gtk.StyleContext.add_provider_for_display(
    Gdk.Display.get_default(),
    preview_css_provider,
    Gtk.STYLE_PROVIDER_PRIORITY_APPLICATION
)

dynamic_color_provider = Gtk.CssProvider()
Gtk.StyleContext.add_provider_for_display(
    Gdk.Display.get_default(),
    dynamic_color_provider,
    Gtk.STYLE_PROVIDER_PRIORITY_APPLICATION
)

class ThemeManager(Adw.ApplicationWindow):
    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        
        self.current_colors = {} 

        


        
        self.set_title("Color My Gnome")
        self.set_default_size(400, 500)

        #  Main Layout Container
        self.toast_overlay = Adw.ToastOverlay()
        self.main_box = Gtk.Box(orientation=Gtk.Orientation.VERTICAL)

        self.toast_overlay.set_child(self.main_box) 
        self.set_content(self.toast_overlay)       


        
        
                #  Header Bar
        self.header = Adw.HeaderBar()
        self.main_box.append(self.header)
        
        
        
        self.page = Adw.PreferencesPage()
        self.group = Adw.PreferencesGroup()
        self.group.set_title("Theme Configuration")
        
    
        self.main_box.append(self.page)
        


        # Select Profile 
        self.load_group = Adw.PreferencesGroup()
        self.load_group.set_title("Profile Management")
        self.page.add(self.load_group)

       
        self.theme_list = Gtk.StringList.new(themes)
        self.combo_row = Adw.ComboRow(title="Load Existing Profile")
        self.combo_row.set_model(self.theme_list)
        self.load_group.add(self.combo_row)

        # COLOR GROUP (The Hex Entries) ---
        self.color_group = Adw.PreferencesGroup()
        self.color_group.set_title("Theme Colors")
        self.page.add(self.color_group)
        
        self.name_row = Adw.EntryRow(title="Profile Name")
        self.color_group.add(self.name_row)

        self.primary_row = self.create_color_entry("Primary Color", "#3584e4","primary")
        self.color_group.add(self.primary_row)
        self.secondary_row = self.create_color_entry("Secondary Hex", "#241f31", "secondary")
        self.color_group.add(self.secondary_row)
        self.tertiary_row = self.create_color_entry("Tertiary Hex", "#1e1e1e", "tertiary")
        self.color_group.add(self.tertiary_row)
        self.text_row = self.create_color_entry("Text Hex", "#f9f9f9", "text")
        self.color_group.add(self.text_row)      

        # Connect to the selection change signal
        self.combo_row.connect("notify::selected", self.on_theme_select)

        
        # Global Options Group
      
        self.group.set_title("Global Options")
        self.page.add(self.group)
        
        
        # --- TOP BAR SECTION ---
        self.topbar_switch = Adw.SwitchRow(title="Custom Topbar Color")
        self.group.add(self.topbar_switch)

        self.topbar_row = self.create_color_entry("Top Bar Color", "#3584e4","topbar-color")
        
        self.topbar_row.set_visible(False) # Hidden initially
        self.group.add(self.topbar_row)

        # This links the toggle to the row's visibility
        self.topbar_switch.bind_property("active", self.topbar_row, "visible", 0)

        # --- CLOCK SECTION ---
        self.clock_switch = Adw.SwitchRow(title="Custom Clock Color")
        self.group.add(self.clock_switch)

        self.clock_row = self.create_color_entry("Clock Color", "#f9f9f9","clock-color")
       
        self.clock_row.set_visible(False) # Hidden initially
        self.group.add(self.clock_row)

        # This links the toggle to the row's visibility
        self.clock_switch.bind_property("active", self.clock_row, "visible", 0)
        
        # --- PAPIRUS ICON SYNC TOGGLE ---
        self.icon_sync_switch = Adw.SwitchRow()
        self.icon_sync_switch.set_title("Sync Papirus Icons with Theme")
        self.icon_sync_switch.set_active(False) # Default off
        self.group.add(self.icon_sync_switch)

        # --- ZEN BROWSER TOGGLE ---
        self.zen_switch = Adw.SwitchRow()
        self.zen_switch.set_title("Apply to Zen Browser &amp; YouTube")
        self.zen_switch.set_active(True)
        self.group.add(self.zen_switch)
        # --- TRANSPARENCY TOGGLE ---
        self.trans_switch = Adw.SwitchRow()
        self.trans_switch.set_title("Enable Global Transparency")
        self.trans_switch.set_active(False) # Default solid
        self.group.add(self.trans_switch)
        
                # Button             # Create the build button
        self.build_btn = Gtk.Button(label="Build and Apply Theme")
        self.build_btn.add_css_class("suggested-action") # color
        self.build_btn.set_margin_top(24)
        self.build_btn.set_margin_bottom(24)
        
        # Connect the signal to the method above
        self.build_btn.connect("clicked", self.on_run_build_clicked)
        
        # button to mainbox
        self.main_box.append(self.build_btn)
        
        
        initial_css = ""
        for cid, hcolor in self.current_colors.items():
            initial_css += f"#{cid}-preview {{ background-color: {hcolor}; border-radius: 6px; min-width: 24px; min-height: 24px; }}\n"
        dynamic_color_provider.load_from_string(initial_css)
        
        
    
    def create_color_entry(self, label, default_hex, css_id):
        row = Adw.EntryRow(title=label)
        row.set_text(default_hex)
        self.current_colors[css_id] = default_hex # Store initial color

        preview = Gtk.Image.new_from_icon_name("color-select-symbolic")
        preview.set_pixel_size(24)
        preview.add_css_class("color-preview-box")
        preview.set_name(f"{css_id}-preview")
        row.add_suffix(preview)

        def update_preview(entry, pspec):
            hex_code = entry.get_text()
            rgba = Gdk.RGBA()
            if rgba.parse(hex_code):
                #  Update this specific color in registry
                self.current_colors[css_id] = hex_code
                
                # Rebuild the ENTIRE CSS string for all registered boxes
                full_css = ""
                for cid, hcolor in self.current_colors.items():
                    full_css += f"#{cid}-preview {{ background-color: {hcolor}; border-radius: 6px; min-width: 24px; min-height: 24px; }}\n"
                
                #  Load the full set into the global provider
                # This ensures no box loses its color when another updates
                dynamic_color_provider.load_from_string(full_css)

        row.connect("notify::text", update_preview)
        # Initial call is handled after all rows are created to ensure all are in registry
        return row

        # --- DATA EXTRACTION LOGIC ---
    def get_scss_value(self, filename, variable):
        path = os.path.join(SCSS_DIR, f"_{filename}.scss")
        if not os.path.exists(path): return ""
        with open(path, 'r') as f:
            content = f.read()
            match = re.search(fr"\${variable}:\s*([^;]+);", content)
            return match.group(1).strip() if match else ""

    
    def on_theme_select(self, combo_row, gparamspec):
        # Get the current selected string
        selected_index = combo_row.get_selected()
        selected_theme = self.theme_list.get_string(selected_index)
        
        if not selected_theme:
            return

        #  Update the Name field
        self.name_row.set_text(selected_theme)
        
        # Update EACH color row specifically
        # Using existing get_scss_value logic
        self.primary_row.set_text(self.get_scss_value(selected_theme, "primary"))
        self.secondary_row.set_text(self.get_scss_value(selected_theme, "secondary"))
        self.tertiary_row.set_text(self.get_scss_value(selected_theme, "tertiary"))
        self.text_row.set_text(self.get_scss_value(selected_theme, "text"))
        
        tb_val = self.get_scss_value(selected_theme, "topbar-color")
        if tb_val:
            self.topbar_row.set_text(tb_val)
            self.topbar_switch.set_active(True)
        else:
            # If the file doesn't have it, reset to a safe default but don't clear it!
            self.topbar_row.set_text("#3584e4") 
            self.topbar_switch.set_active(False)
        clock_val = self.get_scss_value(selected_theme, "clock-color")
        if clock_val:
            self.clock_row.set_text(clock_val)
            self.clock_switch.set_active(True)
        else:
            # If the file doesn't have it, reset to a safe default but don't clear it!
            self.clock_row.set_text("#3584e4") 
            self.clock_switch.set_active(False)
        # If you have the switch: self.topbar_switch.set_active(True)
    # Assuming 'selected' is the string from your dropdown/ComboRow
    def update_gui_from_file(self, selected):
        # 1. Auto-fill standard color rows
        # In PyGObject, we store rows in a dictionary: self.color_rows = {"primary": row_object, ...}
        for var, row in self.color_rows.items():
            val = self.get_scss_value(selected, var)
            if val:
                row.set_text(val)  # Replaces delete(0, tk.END) and insert(0, val)

        # 2. Check for Topbar Color
        tb_val = self.get_scss_value(selected, "topbar-color")
        
        if tb_val:
            self.topbar_row.set_text(tb_val) # Set the hex code
            self.topbar_switch.set_active(True) # Turn the toggle ON
            self.topbar_row.set_visible(True)   # Show the row (replaces toggle_topbar)
        else:
            self.topbar_switch.set_active(False) # Turn the toggle OFF
            self.topbar_row.set_visible(False)   # Hide the row

        


        cl_val = self.get_scss_value(selected, "clock-color")

        if cl_val:
            # Set the text in the Adw.EntryRow
            self.clock_row.set_text(cl_val)
            
            # Toggle the SwitchRow to "On"
            self.clock_switch.set_active(True)
            
            # Show the row (GTK4 handles the layout animation automatically)
            self.clock_row.set_visible(True)
        else:
            # Toggle the SwitchRow to "Off"
            self.clock_switch.set_active(False)
            
            # Hide the row
            self.clock_row.set_visible(False)
        # --- Top Bar Section ---
        # 1. The Toggle Switch
        self.topbar_switch = Adw.SwitchRow()
        self.topbar_switch.set_title("Custom Topbar")
        self.topbar_switch.set_active(False) # Default to 0
        self.group.add(self.topbar_switch)

        # 2. The Color Entry Row
        self.topbar_row = Adw.EntryRow()
        self.topbar_row.set_title("Topbar Color")
        self.topbar_row.set_text("#3584e4") # Default value
        self.group.add(self.topbar_row)

        # 
        # This binds the 'visible' property of the entry row to 
        # the 'active' property of the switch.
        self.topbar_switch.bind_property(
            "active", 
            self.topbar_row, 
            "visible", 
            GObject.BindingFlags.SYNC_CREATE
        )


        # --- Clock Section ---
        #  The Toggle Switch
        self.clock_switch = Adw.SwitchRow()
        self.clock_switch.set_title("Custom Clock Color")
        self.clock_switch.set_active(False) # Default to 0/False
        self.group.add(self.clock_switch)

        #  The Color Entry Row
        self.clock_row = Adw.EntryRow()
        self.clock_row.set_title("Clock Color Hex")
        self.clock_row.set_text("#3584e4") # Default value
        self.group.add(self.clock_row)

        #  
        # This replaces the entire 'toggle_clock' function logic.
        # It binds the 'active' state of the switch to the 'visible' state of the row.
        self.clock_switch.bind_property(
            "active", 
            self.clock_row, 
            "visible", 
            GObject.BindingFlags.SYNC_CREATE
        )

        # ---  THE DROPDOWN (ComboRow) ---
        # Create the dropdown row
        self.combo_row = Adw.ComboRow()
        self.combo_row.set_title("Load Existing Profile")

        # Scan SCSS_DIR for files
        themes = [f[1:-5] for f in os.listdir(SCSS_DIR) if f.startswith('_') and f.endswith('.scss')]

        # GTK4 uses a StringList to hold the dropdown items
        self.theme_list = Gtk.StringList.new(themes)
        self.combo_row.set_model(self.theme_list)

        # Connect the selection event (Replaces <<ComboboxSelected>>)
        # 'notify::selected' triggers whenever the user picks a new item
        self.combo_row.connect("notify::selected", self.on_theme_select)
        self.group.add(self.combo_row)

        # ---  THE ENTRY ROWS ---
        self.color_rows = {} # To store rows for later access

        # Define the fields 
        fields = [("New Name", "name"), ("Primary", "primary"), 
                  ("Secondary", "secondary"), ("Tertiary", "tertiary"), ("Text", "text")]

        for label, var in fields:
            row = Adw.EntryRow()
            row.set_title(label)
            
            # Store references so we can pull text later
            if var == "name":
                self.name_row = row
            else:
                self.color_rows[var] = row
                
            self.group.add(row)
        
        
        # --- RUN BASH SCRIPT ---

        
    def on_run_build_clicked(self, button):
    # Get primary hex and ensure it is a string
        primary_color = str(self.primary_row.get_text() or "#3584e4")
        text_color = str(self.text_row.get_text() or "#f9f9f9")

     
        if self.topbar_switch.get_active():
            topbar_val = str(self.topbar_row.get_text())
        else:
            topbar_val = primary_color

        if self.clock_switch.get_active():
            clock_val = str(self.clock_row.get_text())
        else:
            clock_val = text_color

     
        if not topbar_val.strip(): topbar_val = primary_color
        if not clock_val.strip(): clock_val = text_color
           
        args = [
            self.name_row.get_text(),
            self.primary_row.get_text(),
            self.secondary_row.get_text(),
            self.tertiary_row.get_text(),
            self.text_row.get_text(),
            "1" if self.zen_switch.get_active() else "0",
            "1" if self.topbar_switch.get_active() else "0",
            topbar_val,
            "1" if self.clock_switch.get_active() else "0",
            clock_val,
            "1" if self.trans_switch.get_active() else "0",
            "0.8",
            "1" if self.icon_sync_switch.get_active() else "0"  # ${13}
        ]
        
        button.set_sensitive(False)
        
        def worker():
            try:
                import subprocess
                subprocess.run(["bash", BASH_SCRIPT] + args, check=True)
                from gi.repository import GLib
           
                GLib.idle_add(self.show_success_toast, args[0], button)
            except Exception as e:
                from gi.repository import GLib
                GLib.idle_add(self.show_error_dialog, f"Build failed: {e}")
                GLib.idle_add(button.set_sensitive, True)
                
     
        thread = threading.Thread(target=worker)
        thread.start()


    def show_success_toast(self, theme_name, button):
        """Standard 2025 UI update logic."""
        toast = Adw.Toast.new(f"Theme '{theme_name}' applied!")
        self.toast_overlay.add_toast(toast)
        button.set_sensitive(True) 




    def show_error_dialog(self, message):
        """Modern 2025 replacement for Adw.MessageDialog."""
     #  Create the AlertDialog
        dialog = Adw.AlertDialog.new(
            "Error",       
            message         
        )
        
        # 'OK' button (response ID, label)
        dialog.add_response("ok", "OK")
        
    #    Set the default (accented) response
        dialog.set_default_response("ok")
   
        dialog.choose(self, None, lambda *args: None)


class MyApp(Adw.Application):
    def __init__(self):
        super().__init__(application_id="com.user.ColorMyGnome")
    
        self.connect("activate", self.on_activate)

    def on_activate(self, app):
   
        self.win = ThemeManager(application=app)
        self.win.present()



import sys

if __name__ == "__main__":
    app = MyApp()

    exit_status = app.run(sys.argv)
    sys.exit(exit_status)

#!/bin/bash

TARGET_DIR="$HOME/.local/share/Color-My-Gnome/scss"
# Set your default values here
DEF_P="#3584e4"   # GNOME Blue
DEF_S="#241f31" # Dark Gray
DEF_T="#1e1e1e"  # Deep Black
DEF_TXT="#f9f9f9"      # White
main_scss="gnome-shell.scss"
temp_scss=$(mktemp --suffix=".scss")

gtk4_scss="gtk4.scss"
output_css="$HOME/.local/share/themes/Color-My-Gnome/gnome-shell/gnome-shell.css"
output_gtk4_css="$HOME/.config/gtk-4.0/gtk.css"
output_gtk4dark_css="$HOME/.config/gtk-4.0/gtk-dark.css"
SCSS_DIR="$HOME/.local/share/Color-My-Gnome/scss"
youtube_scss="$HOME/.local/share/Color-My-Gnome/scss/youtube.scss"
output_youtube="$HOME/.local/share/Color-My-Gnome/scss/youtube.css"
zen_scss="$HOME/.local/share/Color-My-Gnome/scss/zen.scss"
output_zen="$HOME/.local/share/Color-My-Gnome/scss/zen.css"
vencord_scss="$HOME/.local/share/Color-My-Gnome/scss/vencord.theme.scss"
output_vencord="$HOME/.config/vesktop/themes/vencord.theme.css"

ZEN_BASE_MANUAL="$HOME/.zen"
ZEN_BASE_FLATPAK="$HOME/.var/app/app.zen_browser.zen/zen"

CSS_IMPORT_LINE="@import url(\"file://$HOME/.local/share/Color-My-Gnome/scss/youtube.css\");
@-moz-document domain(youtube.com) {

}"

CSS_IMPORT_LINE2="@import url(\"file://$HOME/.local/share/Color-My-Gnome/scss/zen.css\");"

DIRS=(
    "$ZEN_CHROME_DIR"
    "$HOME/.config/vesktop/theme"
)
# ---------------------

get_val() {
    # Looks for "$variable: value;" and returns just the value
    grep "\$$1:" "$partial_file" | sed "s/.*\$$1: \(.*\);/\1/"
}

show_color() {
    local hex=${1#\#} # Remove the '#' if present
    # Extract R, G, and B from hex and convert to decimal
    local r=$((16#${hex:0:2}))
    local g=$((16#${hex:2:2}))
    local b=$((16#${hex:4:2}))
    
    # Print a colored block using background escape sequence \e[48;2;R;G;Bm
    printf "\e[48;2;%d;%d;%dm  \e[0m #%s\n" "$r" "$g" "$b" "$hex"
}

custom_top_bar_logic() {
   read -p "Apply global transparency to background elements? (y/n): " trans_choice

if [[ "$trans_choice" =~ ^[Yy]$ ]]; then
    read -p "Enter alpha value (0.0 to 1.0, e.g., 0.5): " alpha
    APPLY_TRANS=true
else
    APPLY_TRANS=false
fi

# Save the transparency status into a comment at the top of the partial
if [ "$APPLY_TRANS" = true ]; then
    trans_flag="// TRANSPARENT: true ($alpha)"
else
    trans_flag="// TRANSPARENT: false"
fi

if [ "$APPLY_TRANS" = true ]; then
    echo "Applying transparency ($alpha) to main stylesheet..."

    # This regex looks for $primary, $secondary, or $tertiary.
    # It uses a 'negative lookbehind' logic (simulated in sed) 
    # to ensure it doesn't match if 'rgba(' is already present.
    
    # Wrap $primary, $secondary, $tertiary if NOT already in rgba
    # We target common background variables, excluding $text
    for var in "primary" "secondary" "tertiary"; do
        # regex: replace ' $var' with ' rgba($var, alpha)' 
        # but skip if it preceded by 'rgba('
        sed -i "/BAR_TARGET/! s/\([^a(]\)\$$var/\1rgba(\$$var, $alpha)/g" "$temp_scss"
    done
    
    echo "Transparency applied."
else
    # CLEANUP: If user chose NO, we should revert rgba($var, x) back to $var
    for var in "primary" "secondary" "tertiary" "topbar-color" "clock-color"; do
        sed -i "s/rgba(\$$var, [0-9.]*)/\$$var/g" "$temp_scss"
    done
fi


# New prompt for Top Bar color
topbar_val="\$primary"
read -p "Use a specific background color/transparency for the Top Bar (y/n): " topbar_choice

if [[ "$topbar_choice" =~ ^[Yy]$ ]]; then
    echo "-----------------------------------------------"
    echo "Select a color for the Top Bar:"
    echo "1) Primary ($primary) Default"
    echo "2) Secondary ($secondary)"
    echo "3) Tertiary ($tertiary)"
    echo "4) Text ($text)"
    echo "5) Transparent (rgba(0,0,0,0))"
    echo "6) Enter a custom value (Hex/RGBA)"
    read -p "Selection [1-6]: " topbar_sel

    case $topbar_sel in
        1) topbar_val="\$primary" ;;
        2) topbar_val="\$secondary" ;;
        3) topbar_val="\$tertiary" ;;
        4) topbar_val="\$text" ;;
        5) topbar_val="rgba(0,0,0,0)" ;;
        6) read -p "Enter custom value: " custom_input ;;
        *) echo "Invalid choice, defaulting to \$primary"; topbar_val="\$primary" ;;
    esac
    
  
    

    USE_CUSTOM_TOPBAR=true
else

    USE_CUSTOM_TOPBAR=false
fi

#  Handle TOPBAR Color Replacement in main.scss
if [ "$USE_CUSTOM_TOPBAR" = true ]; then
    # Replace $primaryt with $topbar-color on the line containing the BAR_TARGET comment
    sed -i '/BAR_TARGET/s/\$primary/\$topbar-color/' "$temp_scss"
    echo "Top Bar set to custom variable."
else
    # Revert to $primary if user chose 'no'
    sed -i '/BAR_TARGET/s/\$topbar-color/\$primary/' "$temp_scss"
    echo "Top Bar color reverted to default primary color."
fi

# New prompt for clock color
clock_val="\$text"
read -p "Use a specific color for the Top Bars Date and Time / icons? (y/n): " clock_choice

if [[ "$clock_choice" =~ ^[Yy]$ ]]; then
    echo "-----------------------------------------------"
    echo "Select a color for the Clock:"
    echo "1) Primary ($primary)"
    echo "2) Secondary ($secondary) Default"
    echo "3) Tertiary ($tertiary)"
    echo "4) Text ($text)"
    echo "5) Enter a custom value (Hex/RGBA)"
    read -p "Selection [1-5]: " clock_sel

    case $clock_sel in
        1) clock_val="\$primary" ;;
        2) clock_val="\$secondary" ;;
        3) clock_val="\$tertiary" ;;
        4) clock_val="\$text" ;;
        5) read -p "Enter custom value: " custom_input ;;
        *) echo "Invalid choice, defaulting to \$text"; clock_val="\$text" ;;
    esac
    

    
  
    USE_CUSTOM_CLOCK=true
else

    USE_CUSTOM_CLOCK=false
fi

#  Handle Clock Color Replacement in main.scss
if [ "$USE_CUSTOM_CLOCK" = true ]; then
    # Replace $text with $clock-color on the line containing the TIME_TARGET comment
    sed -i '/TIME_TARGET/s/\$text/\$clock-color/' "$temp_scss"
    echo "Clock color set to custom variable."
else
    # Revert to $text if user chose 'no'
    sed -i '/TIME_TARGET/s/\$clock-color/\$text/' "$temp_scss"
    echo "Clock color reverted to default Text color."
fi
}

configure_theme() {
    CONFIRMED=false
    while [ "$CONFIRMED" = false ]; do
        echo "--- Theme Configuration ---"
        read -p "Primary [$DEF_P]: " ip && primary=${ip:-$DEF_P}
        read -p "Secondary [$DEF_S]: " is && secondary=${is:-$DEF_S}
        read -p "Tertiary [$DEF_T]: " it && tertiary=${it:-$DEF_T}
        read -p "Text [$DEF_TXT]: " itxt && text=${itxt:-$DEF_TXT}

        # Show Summary (assuming show_color is also a function)
        echo -e "\n--- THEME SUMMARY ---"
        echo -n "Primary:   " && show_color "$primary"
        echo -n "Secondary: " && show_color "$secondary"
        echo -n "Tertiary:  " && show_color "$tertiary"
        echo -n "Text:      " && show_color "$text"
        
        # Confirmation
        read -p "Happy with these? (y/n): " c && [[ "$c" =~ ^[Yy]$ ]] && CONFIRMED=true
    done

    # After colors are confirmed, run your extra customization checks
    custom_top_bar_logic

    #  Create partial file
    printf "%s\n\$primary: %s;\n\$secondary: %s;\n\$tertiary: %s;\n\$text: %s;\n\$tertiary-light: rgba(\$tertiary, 0.25);
     \n\$text-light: rgba(\$text, 0.25);\n\$topbar-color: %s;\n\$clock-color: %s;\n" \
	   "$trans_flag" "$primary" "$secondary" "$tertiary" "$text" "$topbar_val" "$clock_val" > "$partial_file"
    echo "saved changes to partial file"
}

# Create dir
mkdir -p "$TARGET_DIR"
cd "$TARGET_DIR" || { echo "Failed to enter $TARGET_DIR"; exit 1; }

cp "$main_scss" "$temp_scss"


# --- OPTION 1: CREATE NEW ---
echo "Select an option:"
echo "1) Create a NEW color profile"
echo "2) Use an EXISTING profile"
read -p "Selection [1-2]: " choice

if [ "$choice" == "1" ]; then

#  Prompt for names
    read -p "Enter NEW color profile name (e.g., light blue): " filename
    #  Format partial filename
    clean_name=$(echo "$filename" | sed 's/^_//;s/\.scss$//')
    partial_file="_${clean_name}.scss"

    configure_theme





selected_import="$clean_name"



 # --- OPTION 2: SELECT EXISTING ---
elif [ "$choice" == "2" ]; then

     

    echo "Available profiles in $SCSS_DIR:"
    # List files, removing underscore and extension for the display
    files=($(ls "$SCSS_DIR" | grep '^_.*\.scss$' | sed 's/^_//;s/\.scss$//'))
    
    if [ ${#files[@]} -eq 0 ]; then
        echo "No partials found! Exiting." && exit 1
    fi

    for i in "${!files[@]}"; do
        echo "$((i+1))) ${files[$i]}"
    done

    read -p "Select a file number: " file_num
    selected_import="${files[$((file_num-1))]}"
    
    if [ -z "$selected_import" ]; then
        echo "Invalid selection." && exit 1
    fi
    selected_import="${files[$((file_num-1))]}"
    partial_file="_${selected_import}.scss"

    read -p "Would you like to edit '$selected_import' before applying? (y/n): " edit_choice
    if [[ "$edit_choice" =~ ^[Yy]$ ]]; then
        # Extract current values to use as new defaults
        DEF_P=$(get_val "primary")
        DEF_S=$(get_val "secondary")
        DEF_T=$(get_val "tertiary")
        DEF_TXT=$(get_val "text")

	 # Load transparency defaults from the header
        flag_line=$(grep "TRANSPARENT:" "$partial_file")
        if [[ "$flag_line" == *"true"* ]]; then
            DEF_TRANS="y"
            DEF_ALPHA=$(echo "$flag_line" | sed 's/.*(\([0-9.]*\)).*/\1/')
        fi
        
        configure_theme

	# Update selected_import in case configure_theme changed the filename
        # (though usually edits keep the same name)
        selected_import=$(echo "$partial_file" | sed 's/^_//;s/\.scss$//')
    fi

   else
    echo "Invalid menu choice." && exit 1
fi

  


   
# --- Auto-Detect Transparency from Partial ---
# Look for the // TRANSPARENT: line in the chosen partial
flag_line=$(grep "TRANSPARENT:" "$partial_file")

if [[ "$flag_line" == *"true"* ]]; then
    # Extract the alpha value from the parentheses, e.g., "0.5"
    alpha=$(echo "$flag_line" | grep -oP '\(\K[0-9.]+')
    # Fallback to 0.8 if extraction fails
    alpha=${alpha:-0.8}
    APPLY_TRANS=true
    echo "Partial: Transparency Detected ($alpha)"
else
    APPLY_TRANS=false
    echo "Partial: Solid Colors Detected"
fi

#  ALWAYS Cleanup first to avoid double-wrapping
for var in "primary" "secondary" "tertiary" "topbar-color" "clock-color"; do
    sed -i "s/rgba(\$$var, [0-9.]*)/\$$var/g" "$temp_scss"
done

# 2. Re-apply only if the flag was true
if [ "$APPLY_TRANS" = true ]; then
    for var in "primary" "secondary" "tertiary" "topbar-color" "clock-color"; do
        # Skip lines with BAR_TARGET
        sed -i "/BAR_TARGET/! s/\([^a(]\)\$$var/\1rgba(\$$var, $alpha)/g" "$temp_scss"
    done
    echo "Main stylesheet synchronized with transparent partial."
else
    echo "Main stylesheet synchronized with solid partial."
fi



#  Clean existing imports and add new one
import_statement="@use '$HOME/.local/share/Color-My-Gnome/scss/$selected_import' as *;"

if [ -f "$temp_scss" ]; then
    # Delete any line that starts with @import, regardless of the filename
    sed -i '/^@use/d' "$temp_scss"
    echo "Removed previous @use statements from $temp_scss."
else
    touch "$temp_scss"
fi

if [ -f "$gtk4_scss" ]; then
    # Delete any line that starts with @import, regardless of the filename
    sed -i '/^@use/d' "$gtk4_scss"
    echo "Removed previous @use statements from $gtk4_scss."
else
    touch "$gtk4_scss"
fi

if [ -f "$youtube_scss" ]; then
    # Delete any line that starts with @import, regardless of the filename
    sed -i '/^@use/d' "$youtube_scss"
    echo "Removed previous @use statements from $youtube_scss."
else
    touch "$youtube_scss"
fi

if [ -f "$zen_scss" ]; then
    # Delete any line that starts with @import, regardless of the filename
    sed -i '/^@use/d' "$zen_scss"
    echo "Removed previous @use statements from $zen_scss."
else
    touch "$zen_scss"
fi

if [ -f "$zen_scss" ]; then
    # Delete any line that starts with @import, regardless of the filename
    sed -i '/^@use/d' "$vencord_scss"
    echo "Removed previous @use statements from $vencord_scss."
else
    touch "$vencord_scss"
fi

# Append the new import at the top of the file
echo "$import_statement" | cat - "$temp_scss" > temp && mv temp "$temp_scss"

echo "$import_statement" | cat - "$gtk4_scss" > temp && mv temp "$gtk4_scss"

echo "$import_statement" | cat - "$youtube_scss" > temp && mv temp "$youtube_scss"

echo "$import_statement" | cat - "$zen_scss" > temp && mv temp "$zen_scss"

echo "$import_statement" | cat - "$vencord_scss" > temp && mv temp "$vencord_scss"

#  Compile SCSS to CSS
echo "-----------------------------------------------"
read -p "Would you like to apply the Zen Browser, Vesktop and YouTube style? (y/n): " apply_youtube

if command -v npx sass &> /dev/null; then
    
    #  Compile YouTube CSS if user said 'y'
    if [[ "$apply_youtube" =~ ^[Yy]$ ]]; then
	echo "Checking for Zen Browser profiles..."
    if [ -d "$ZEN_BASE_FLATPAK" ]; then
        ZEN_BASE="$ZEN_BASE_FLATPAK"
    elif [ -d "$ZEN_BASE_MANUAL" ]; then
        ZEN_BASE="$ZEN_BASE_MANUAL"
    else
        echo "Zen Browser profile base directory not found."
        exit 1
    fi

    REL_PATH=$(grep -m 1 "^Path=" "$ZEN_BASE/profiles.ini" | cut -d= -f2)

    if [ -z "$REL_PATH" ]; then
        echo "Could not determine the active Zen profile path."
        exit 1
    fi

    #   Construct the path
    ZEN_CHROME_DIR="$ZEN_BASE/$REL_PATH/chrome"
    echo "Detected Zen Chrome Directory: $ZEN_CHROME_DIR"

    #  ADD the detected path to your DIRS array
    # This ensures the loop actually sees the folder you just found
    DIRS+=("$ZEN_CHROME_DIR")

    #   Create the folders
    for dir in "${DIRS[@]}"; do
        if [ -n "$dir" ]; then  # Extra safety check: only run if dir is not empty
            mkdir -p "$dir"
        fi
    done
    printf "%s\n" "$CSS_IMPORT_LINE2" > "$ZEN_CHROME_DIR/userChrome.css"
    printf "%s\n" "$CSS_IMPORT_LINE" > "$ZEN_CHROME_DIR/userContent.css"

    echo "Created userChrome.css and userContent.css in $ZEN_CHROME_DIR"
        echo "Compiling YouTube styles..."
        npx sass "$youtube_scss" "$output_youtube" --style expanded
	npx sass "$zen_scss" "$output_zen" --style expanded
	npx sass "$vencord_scss" "$output_vencord" --style expanded
    else
        echo "Skipping YouTube styles."
    fi

    #  Always compile Main and GTK styles
    echo "Compiling $temp_scss to $output_css..."
    npx sass "$temp_scss" "$output_css" --style expanded
    
    echo "Compiling to $output_gtk4_css..."
    npx sass "$gtk4_scss" "$output_gtk4_css" --style expanded
    
    echo "Compiling to $output_gtk4dark_css..."
    npx sass "$gtk4_scss" "$output_gtk4dark_css" --style expanded
       
else
    echo "Error: 'sass' compiler not found. Install with: npm install -g sass"
fi

# Remove temp file
rm "$temp_scss"


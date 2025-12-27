# Color-My-GNOME
A simple cli tool for changing the colors of the gnome-shell and gtk apps on GNOME

Requriements:
GNOME 49 (may work on older versions)
GNOME TWEAKS ( GITHUB https://github.com/GNOME/gnome-tweaks Ubuntu/Debian: sudo apt install gnome-tweaks  )
NPM
Sass

Install:

git clone 
make install

Color My GNOME installs into ~/.local/bin which may not be automatically included in the PATH of some distrobutions like Arch linux, please add 
export PATH="$HOME/.local/bin:$PATH"
to your .bashrc and run 
. ~/.bashrc
to refresh

Usage:

Run the command 
color-my-gnome
You will then have the option to either create a new color profile or choose from an existing color profile to swap to, Color My Gnome currently supports picking hex color values for four different elements: Primary, Secondary, Tertiary, as well as a Text color. Theres is also an option to pick a specific color for the Date/Time, the top bar icons, and the top bar background, as well as the option to make the top bar background completely transparent.

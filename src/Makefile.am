SUBDIRS = fastbit
bin_PROGRAMS = fbsql fbsql_tab join_once scatter scatter_new scatter_ez gwas2go ranges
SUFFIXES = .cpp
CC = g++
CPPFLAGS = -Ifastbit/src
LDFLAGS  = -Lfastbit/src/.libs -lfastbit -lm -Wl,-rpath,$(libdir)
LINK = $(CCLD) $(AM_CFLAGS) $@.o $(CFLAGS)$(AM_LDFLAGS) $(LDFLAGS) -o $@ 

#!/bin/bash
set -e

SERVER="pg_notes";
DB="pg_notes";

echo "CREATE DATABASE $DB ENCODING 'UTF-8';" | docker exec -i $SERVER psql -U postgres

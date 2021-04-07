start:
	@echo "${BLUE}Starting containers.${NC}"
	@docker-compose up -d --build
stop:
	@echo "${YELLOW}Stopping containers.${NC}"
	@docker-compose stop
restart:
	@echo "${BLUE}Stopping all containers.${NC}"
	@make stop && make start

help:
	@echo "${ORANGE}Usage:${NC} ${GREEN}make ${NC}[TARGET]${NC}"
	@echo "${LIGHT_PURPLE}Docker Targets${NC}"
	@echo "  start            ${CYAN} Create and start containers.${NC}"
	@echo "  stop             ${CYAN} Stop and remove containers.${NC}"
	@echo "  restart          ${CYAN} Restart containers.${NC}"


RED=\033[0;31m
LIGHT_RED=\033[1;31m
GREEN=\033[0;32m
LIGHT_GREEN=\033[1;32m
ORANGE=\033[0;33m
YELLOW=\033[1;33m
BLUE=\033[0;34m
LIGHT_BLUE=\033[1;34m
PURPLE=\033[0;35m
LIGHT_PURPLE=\033[1;35m
CYAN=\033[0;36m
LIGHT_CYAN=\033[1;36m
NC=\033[0m


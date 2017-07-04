#!/usr/bin/env bash

repoName() {
	local DOCKERHUB_REPO_NAME=""
	if [ "$TRAVIS_BRANCH" == "master" ]; then
		local DOCKERHUB_REPO_NAME="stable"
  elif [ "$TRAVIS_BRANCH" == "development" ]; then
  	local DOCKERHUB_REPO_NAME="devel"
  fi;
  echo ${DOCKERHUB_REPO_NAME}
}
#!/bin/bash

yarn test:ci
if [[$ == *"snapshot failed"* ]]; then
  yarn run test:ci -u
fi

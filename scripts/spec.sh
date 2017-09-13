export NODE_ENV="test";

if [[ "$1" == "watch" ]]; then
  export TESTAUTO="true";
  export TESTPATH="$2";
else
  export TESTPATH="$1";
fi

[[ ! "$TESTPATH" ]] && export TESTPATH="**/*"

node_modules/karma/bin/karma start;

class Base {
  set setter(val) {
    this.set_val = val;
    this.set_this = this;
  }

}

Base.prototype.prop = "Base";

class Derived extends Base {
  set setter(val) {
    super.setter = val;
  }

  setelem(pname, val) {
    super[pname] = val;
  }

} // Test SETPROP_SUPER invoke setters correctly


function testSetterChain() {
  let d = new Derived();

  for (let i = 0; i < 10; ++i) {
    d.setter = i;
    d.set_val;
    i;
    d.set_this;
    d;
  }
}

function testSetterChainElem() {
  let d = new Derived();

  for (let i = 0; i < 10; ++i) {
    d.setelem("setter", i);
    d.set_val;
    i;
    d.set_this;
    d;
  }
} // Test that SETPROP_SUPER modifies |this| and not home object


function testSuperSetProp() {
  let d = new Derived();

  for (let i = 0; i < 10; ++i) {
    d.prop = i;
    d.prop;
    i;
    d.hasOwnProperty("prop");
    true;
    Derived.prototype.prop;
    "Base";
  }
}

function testSuperSetPropElem() {
  let d = new Derived();

  for (let i = 0; i < 10; ++i) {
    d.setelem("prop", i);
    d.prop;
    i;
    d.hasOwnProperty("prop");
    true;
    Derived.prototype.prop;
    "Base";
  }
}

testSetterChain();
testSetterChainElem();
testSuperSetProp();
testSuperSetPropElem();

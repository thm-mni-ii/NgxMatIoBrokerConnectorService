import {inject, TestBed} from '@angular/core/testing';

import {NgxMatIoBrokerConnectorService} from './ngx-mat-io-broker-connector-service.service';

describe('NgxMatIoBrokerConnectorServiceService', () => {

  let service: NgxMatIoBrokerConnectorService;

  class MockedSettersFunction {
    setter(object: string, state: string, value: any) {
      return [object + '.' + state, value, null];
    }
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NgxMatIoBrokerConnectorService]
    });

    service = TestBed.get(NgxMatIoBrokerConnectorService);
  });

  it('should be created', inject([NgxMatIoBrokerConnectorService], (service: NgxMatIoBrokerConnectorService) => {
    expect(service).toBeTruthy();
  }));

  it('should contain a servConn object', inject([NgxMatIoBrokerConnectorService], (service: NgxMatIoBrokerConnectorService) => {
    expect(service.servConn).toBeTruthy();
  }));

  it('should create a function that allows the user to connect to the socket adapter', () => {
    expect(service.connect).toBeTruthy();
  });

  it('should create a function that allows the user to register an object with a state as a getter', () => {
    expect(service.registerGetter).toBeTruthy();
  });

  it('should create a function that allows the user to remove a specific registered getter', () => {
    expect(service.removeRegistered).toBeTruthy();
  });

  it('should create a function that allows the user to get data from a specific object and state', () => {
    expect(service.getter).toBeTruthy();
  });

  it('should create a function that allows the user to get all states with their data', () => {
    expect(service.getAllStates).toBeTruthy();
  });

  it('should create a function that allows the user to set the data of a specific object and state', () => {
    expect(service.setter).toBeTruthy();
  });

  it('should create a function that allows the user to set the data of a specific object and state', () => {
    expect(service.setter).toBeTruthy();
  });

  it('should handle the getters array properly', () => {
    service.registerGetter('test1', 'test1');
    service.registerGetter('test2', 'test2');
    expect(service.getters.length).toBe(2);
    expect(service.getters[0].id).toBe('test1.test1');
    expect(service.getters[1].id).toBe('test2.test2');
    service.removeRegistered('test1', 'test1');
    service.registerGetter('test2', 'test2');
    service.registerGetter('test2', 'test2');
    service.registerGetter('test2', 'test2');
    expect(service.getters.length).toBe(1);
    expect(service.getters[0].id).toBe('test2.test2');
    service.registerGetter('test3', 'test3');
    service.registerGetter('test4', 'test4');
    service.registerGetter('test5', 'test5');
    service.removeRegistered('test4', 'test4');
    expect(service.getters.length).toBe(3);
    expect(service.getters[0].id).toBe('test2.test2');
    expect(service.getters[1].id).toBe('test3.test3');
    expect(service.getters[2].id).toBe('test5.test5');
  });

  it('should return data from the getter function', () => {
    service.states = {
      "system.adapter.deconz.0.outputCount": {
        "val": 10,
        "ack": true,
        "ts": 1575457026509,
        "q": 0,
        "from": "system.adapter.deconz.0",
        "lc": 1575457011502
      },
      "system.adapter.deconz.0.inputCount": {
        "val": 0,
        "ack": true,
        "ts": 1575457026508,
        "q": 0,
        "from": "system.adapter.deconz.0",
        "lc": 1575457011499
      },
      "deconz.0.Sensors.2.buttonevent": {
        "val": 1337,
        "ack": false,
        "ts": 1574341878626,
        "q": 0,
        "from": "system.adapter.socketio.0",
        "user": "system.user.admin",
        "lc": 1574341878626
      },
      "deconz.0.Sensors.2.battery": {
        "val": 100,
        "ack": true,
        "ts": 1575455423227,
        "q": 0,
        "from": "system.adapter.deconz.0",
        "user": "system.user.admin",
        "lc": 1574076155642
      }
    };

    let variable = service.getter('deconz.0.Sensors.2', 'buttonevent', 'val');
    expect(variable).toBe(1337);
    let variable2 = service.getter('deconz.0.Sensors.2', 'buttonevent', '');
    expect(variable2).toEqual({
      "val": 1337,
      "ack": false,
      "ts": 1574341878626,
      "q": 0,
      "from": "system.adapter.socketio.0",
      "user": "system.user.admin",
      "lc": 1574341878626
    });
    let variable3 = service.getter("deconz.0.Sensors.2", "battery", "");
    expect(variable3).toEqual({
      "val": 100,
      "ack": true,
      "ts": 1575455423227,
      "q": 0,
      "from": "system.adapter.deconz.0",
      "user": "system.user.admin",
      "lc": 1574076155642
    });
    let variable4 = service.getter("deconz.0.Sensors.2","battery", "from");
    expect(variable4).toBe("system.adapter.deconz.0");
    let variable5 = service.getter('deconz.0.Sensors.2', 'buttonevent', 'test');
    expect(variable5).toBe(undefined);
    let variable6 = service.getter('deconz.0.Sensors.2', 'test', '');
    expect(variable6).toBe(undefined);
  });

  it('should set data with the setter function', () => {
    let mock = new MockedSettersFunction();
    let variable = mock.setter('deconz.0.Sensors.2', 'buttonevent', 1337);
    expect(variable[0]).toBe("deconz.0.Sensors.2.buttonevent");
    expect(variable[1]).toBe(1337);
    expect(variable[2]).toBe(null);
    let variable2 = mock.setter('system.adapter.deconz.0', 'outputCount', 5612);
    expect(variable2[0]).toBe("system.adapter.deconz.0.outputCount");
    expect(variable2[1]).toBe(5612);
    expect(variable2[2]).toBe(null);
  });

  it('should return all states with the getAllStates function', () => {
    service.states = {
      "system.adapter.deconz.0.outputCount": {
        "val": 10,
        "ack": true,
        "ts": 1575457026509,
        "q": 0,
        "from": "system.adapter.deconz.0",
        "lc": 1575457011502
      },
      "system.adapter.deconz.0.inputCount": {
        "val": 0,
        "ack": true,
        "ts": 1575457026508,
        "q": 0,
        "from": "system.adapter.deconz.0",
        "lc": 1575457011499
      },
      "deconz.0.Sensors.2.buttonevent": {
        "val": 1337,
        "ack": false,
        "ts": 1574341878626,
        "q": 0,
        "from": "system.adapter.socketio.0",
        "user": "system.user.admin",
        "lc": 1574341878626
      },
      "deconz.0.Sensors.2.battery": {
        "val": 100,
        "ack": true,
        "ts": 1575455423227,
        "q": 0,
        "from": "system.adapter.deconz.0",
        "user": "system.user.admin",
        "lc": 1574076155642
      }
    };

    let allStates = service.getAllStates();
    expect(allStates).toEqual({
      "system.adapter.deconz.0.outputCount": {
        "val": 10,
        "ack": true,
        "ts": 1575457026509,
        "q": 0,
        "from": "system.adapter.deconz.0",
        "lc": 1575457011502
      },
      "system.adapter.deconz.0.inputCount": {
        "val": 0,
        "ack": true,
        "ts": 1575457026508,
        "q": 0,
        "from": "system.adapter.deconz.0",
        "lc": 1575457011499
      },
      "deconz.0.Sensors.2.buttonevent": {
        "val": 1337,
        "ack": false,
        "ts": 1574341878626,
        "q": 0,
        "from": "system.adapter.socketio.0",
        "user": "system.user.admin",
        "lc": 1574341878626
      },
      "deconz.0.Sensors.2.battery": {
        "val": 100,
        "ack": true,
        "ts": 1575455423227,
        "q": 0,
        "from": "system.adapter.deconz.0",
        "user": "system.user.admin",
        "lc": 1574076155642
      }
    });
  });
});

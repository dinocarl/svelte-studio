export const data = {
  selected: '',
  msg: 'New session',
  components: {
    BlueThing:  {
      inputs: [ {
        type: 'Text',
        name: 'text',
        val: 'Other text still',
      }, {
        type: 'Radio',
        name: 'variant',
        val: 'md',
        values: ['sm', 'md', 'lg'],
      }, {
        type: 'Bool',
        name: 'testing',
        val: true,
      }, ]
    },
    CompX: {
      inputs: [ {
        type: 'Text',
        name: 'title',
        val: 'Just Some Title',
      } ] },
    GreenThing: {
      inputs: [ {
        type: 'Text',
        name: 'text',
        val: 'Some other text',
      } ] },
    RedThing: {
      inputs: [ {
        type: 'Text',
        name: 'text',
        val: 'Just some text',
      }, {
        type: 'Select',
        values: ['sm', 'md', 'lg'],
        name: 'variant',
        val: 'sm',
      }, ] },
    ListThing: {
      inputs: [ {
        type: 'List',
        name: 'items',
        inputs: [ {
          type: 'Text',
          name: 'itemName',
          val: 'first thing',
        }, {
          type: 'Text',
          name: 'itemName',
          val: 'second thing',
        }, ],
        sample: {
          type: 'Text',
          name: 'itemName',
          val: 'new thing',
        },
      } ] },
    NestedThing: {
      inputs: [ {
        type: 'Nested',
        name: 'attrs',
        inputs: [ {
          type: 'Text',
          name: 'content',
          val: 'Nested Content',
        }, {
          type: 'Text',
          name: 'content2',
          val: 'Nested Content',
        }, {
          type: 'Nested',
          name: 'attrsnested',
          inputs: [ {
            type: 'Text',
            name: 'content3',
            val: 'some val',
          } ],
        } ]
      }, ]
    }
  }
}

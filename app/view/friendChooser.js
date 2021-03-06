/*
 * File: app/view/friendChooser.js
 *
 * This file was generated by Sencha Architect version 2.0.0.
 * http://www.sencha.com/products/architect/
 *
 * This file requires use of the Sencha Touch 2.0.x library, under independent license.
 * License of Sencha Architect does not include license for Sencha Touch 2.0.x. For more
 * details see http://www.sencha.com/license or contact license@sencha.com.
 *
 * This file will be auto-generated each and everytime you save your project.
 *
 * Do NOT hand edit this file.
 */

Ext.define('MyApp.view.friendChooser', {
    extend: 'Ext.Container',
    alias: 'widget.friendchooser',
    config: {
        id: 'friendChooser',
        layout: {
            type: 'vbox'
        },
        items: [
            {
                xtype: 'container',
                height: 20,
                html: 'Please Choose Friends from the list...',
                styleHtmlContent: true
            },
            {
                xtype: 'list',
                margin: 25,
                store: 'Contacts',
                itemTpl: [
                    '<div>{firstname} {lastname}</div>'
                ],
                mode: 'MULTI',
                flex: 1,
                grouped: true,
                emptyText: 'No Contacts to display.<br />Please add some by clicking the plus icon.'
            },
            {
                xtype: 'segmentedbutton',
                height: 40,
                margin: '10 0 10 0',
                layout: {
                    pack: 'center',
                    type: 'hbox'
                },
                items: [
                    {
                        xtype: 'button',
                        text: 'Cancel',
                        action: 'cancel'
                    },
                    {
                        xtype: 'button',
                        text: 'Finish',
                        action: 'finish'
                    }
                ]
            }
        ]
    }

});
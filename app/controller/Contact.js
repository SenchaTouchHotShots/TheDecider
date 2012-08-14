/*
 * File: app/controller/Contact.js
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

Ext.define('MyApp.controller.Contact', {
    extend: 'Ext.app.Controller',
    config: {
        refs: {
            contactEditor: '#editContact',
            categoryList: '#editContact list',
            cancelButton: '#editContact button[text="Cancel"]',
            saveButton: '#editContact button[text="Save"]',
            viewContainer: '#viewport'
        },
        control: {
            cancelButton: {
                tap: 'doCancel'
            },
            saveButton: {
                tap: 'doSave'
            }
        }
    },
    doCancel: function() {
        this.getContactEditor().reset();
        this.getCategoryList().deselectAll();
        this.getViewContainer().setActiveItem(0);
    },
    doSave: function() {

        var contact = Ext.create('MyApp.model.Contact', this.getContactEditor().getValues());
        var categories = this.getCategoryList().getSelection();
        var categoryIDs = [];
        Ext.each(categories, function(category) {
            categoryIDs.push(category.get('id'));
        });
        contact.set('categories', categoryIDs.join(','));

        contact.save(function() {
            console.log('Contact: ',contact);
        });

        this.doCancel();
    }
});
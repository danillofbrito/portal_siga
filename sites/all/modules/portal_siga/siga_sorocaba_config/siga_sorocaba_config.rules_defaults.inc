<?php
/**
 * @file
 * siga_sorocaba_config.rules_defaults.inc
 */

/**
 * Implements hook_default_rules_configuration().
 */
function siga_sorocaba_config_default_rules_configuration() {
  $items = array();
  $items['rules_enviar_email_no_contato'] = entity_import('rules_config', '{ "rules_enviar_email_no_contato" : {
      "LABEL" : "Enviar email no contato",
      "PLUGIN" : "reaction rule",
      "TAGS" : [ "email" ],
      "REQUIRES" : [ "webform_rules", "rules" ],
      "ON" : { "node_insert--webform" : { "bundle" : "webform" } },
      "DO" : [
        { "webform_submissions_load" : {
            "USING" : { "nid" : [ "node:nid" ], "sid" : [ "node:nid" ] },
            "PROVIDE" : { "submissions" : { "submissions" : "Fetched submissions" } }
          }
        },
        { "LOOP" : {
            "USING" : { "list" : [ "submissions" ] },
            "ITEM" : { "list_item" : "Current list item" },
            "DO" : [
              { "mail" : {
                  "to" : "maurinho.coelho@gmail.com",
                  "subject" : "[site:name] - Email enviado a partir de [node:title]",
                  "message" : "[data:{nome}-value] lhe enviou a seguinte mensagem:\\r\\n\\r\\n[data:{mensagem}-value]",
                  "from" : "[data:{e_mail}-value]",
                  "language" : [ "" ]
                }
              }
            ]
          }
        }
      ]
    }
  }');
  return $items;
}
